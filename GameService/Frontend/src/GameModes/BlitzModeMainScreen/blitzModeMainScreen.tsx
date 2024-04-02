import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Player {
    id: number;
    username: string;
    games_played: number;
    games_won: number;
    roomId: string;
}

interface RoomDetails {
    id: string;
    question_count: number;
    time_per_question: number;
    player_count: number;
    name: string;
    players: Player[];
}

interface RoomProps {
    wsUrl: string;
}

type WebSocketMessage = {
    topic: 'roomUpdate' | 'gameStart'
    content: any
}

const Room: React.FC<RoomProps> = ({ wsUrl }) => {
    const [room, setRoom] = useState<RoomDetails | null>(null);
    const navigate = useNavigate();
    const { roomId } = useParams<{ roomId: string }>();

    useEffect(() => {
        if (!roomId) return;

        const ws = new WebSocket(wsUrl + roomId);

        const closeWebSocket = () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
                console.log('WebSocket connection closed');
            }
        };

        ws.onopen = () => {
            console.log('WebSocket connection established');
            ws.send(JSON.stringify({ action: 'joinRoom', roomId }));
        };

        ws.onmessage = (event) => {
            const data: WebSocketMessage = JSON.parse(event.data);
            if (data.topic === 'roomUpdate') {
                const roomData: RoomDetails = data.content;
                setRoom(roomData);
            } else if (data.topic === 'gameStart') {
                console.log('Game To Be Started')
            }
        };

        ws.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        window.addEventListener('beforeunload', closeWebSocket);

        return () => {
            closeWebSocket();
            window.removeEventListener('beforeunload', closeWebSocket);
        };
    }, [wsUrl, roomId]);

    const leaveRoom = () => {
        navigate('/game/');
    };

    if (!room) {
        return <div>Loading room details...</div>;
    }

    return (
        <div>
            <h2>{room.name}</h2>
            <p>Question Count: {room.question_count}</p>
            <p>Time Per Question: {room.time_per_question}s</p>
            <p>Player Count: {room.player_count}</p>
            <ul>
                {room.players.map((player) => (
                    <li key={player.id}>{player.username} (Games Won: {player.games_won})</li>
                ))}
            </ul>
            <button onClick={leaveRoom}>Leave Room</button>
        </div>
    );
};

export default Room;
