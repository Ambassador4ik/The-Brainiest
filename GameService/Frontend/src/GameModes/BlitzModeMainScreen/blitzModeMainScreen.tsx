import React, { useEffect, useState } from 'react';
import styles from './blitzModeMainScreen.module.css'
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

interface Question {
    title: string;
    options: {
        text: string;
        isCorrect: boolean;
    }[];
}

interface RoomProps {
    wsUrl: string;
}

type WebSocketMessage = {
    topic: 'roomUpdate' | 'gameStart' | 'newQuestion';
    content: any;
}

const Room: React.FC<RoomProps> = ({ wsUrl }) => {
    const [room, setRoom] = useState<RoomDetails | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [userAnswer, setUserAnswer] = useState<{ selectedOption: string; isCorrect: boolean } | null>(null);
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
            switch (data.topic) {
                case 'roomUpdate':
                    setRoom(data.content as RoomDetails);
                    break;
                case 'gameStart':
                    console.log('Game started');
                    break;
                case 'newQuestion':
                    setCurrentQuestion(data.content);
                    setUserAnswer(null); // Reset the answer state with new question
                    break;
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

    const handleOptionClick = (optionIndex: number) => {
        if (currentQuestion) {
            const isCorrect = currentQuestion.options[optionIndex].isCorrect;
            const selectedOption = currentQuestion.options[optionIndex].text;
            setUserAnswer({ selectedOption, isCorrect });

        }
    };

    const leaveRoom = () => {
        navigate('/game/');
    };

    if (!room) {
        return <div>Loading room details...</div>;
    }

    return (
        <div className={styles.roomContainer}>
            <h2 className={styles.header}>{room.name}</h2>
            <p className={styles.stats}>Player Count: {room.player_count}</p>
            <ul className={styles.playersList}>
                {room.players.map(player => (
                    <li key={player.id} className={styles.player}>{player.username} (Games Won: {player.games_won})</li>
                ))}
            </ul>
            {currentQuestion && (
                <div className={styles.questionContainer}>
                    <h3>{currentQuestion.title}</h3>
                    <ul className={styles.cont}>
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                className={styles.optionButton}
                            >
                                {option.text}
                            </button>
                        ))}
                    </ul>
                    {userAnswer && (
                        <p>{userAnswer.isCorrect ? 'Correct!' : 'Incorrect.'}</p>
                    )}
                </div>
            )}
            <button onClick={leaveRoom} className={styles.leaveButton}>Leave Room</button>
        </div>
    );
};

export default Room;
