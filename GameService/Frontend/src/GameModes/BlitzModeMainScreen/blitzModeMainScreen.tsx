import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

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
    roomId: string;
}

const Room: React.FC<RoomProps> = ({ wsUrl, roomId }) => {
    const [room, setRoom] = useState<RoomDetails | null>(null);
    //const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

    useEffect(() => {
        const ws = new WebSocket(wsUrl);

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
            const data: RoomDetails = JSON.parse(event.data);
            setRoom(data);
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

    // Function to handle disconnection and redirection
    const leaveRoom = () => {
        // Assuming your WebSocket close logic is correct and it notifies the server accordingly
        const ws = new WebSocket(wsUrl);
        ws.onopen = () => {
            ws.send(JSON.stringify({ action: 'leaveRoom', roomId }));
            ws.close();
        };

        console.log('Left Room') // Navigate to the root. Adjust the route as needed.
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
            <button onClick={leaveRoom}>Leave Room</button> {/* Add the Leave Room button */}
        </div>
    );
};

export default Room;
