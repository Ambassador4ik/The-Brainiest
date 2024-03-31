import { useState, useEffect, useRef } from 'react';

interface Message {
    // Define the structure of your message here. For demonstration:
    text: string;
}

function useWebSocket(roomId: string) {
    const [messages, setMessages] = useState<Message[]>([]);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        const wsUrl = `ws://localhost:3002/game/${roomId}`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('WebSocket Connected');
        };

        ws.current.onmessage = (event) => {
            const message: Message = JSON.parse(event.data);
            setMessages((prev) => [...prev, message]);
        };

        ws.current.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        return () => {
            //ws.current?.close();
        };
    }, [roomId]);

    const sendMessage = (message: Message) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        }
    };

    return { messages, sendMessage };
}

import React from 'react';

interface GameComponentProps {
    roomId: string;
}

const BlitzModeMainScreen : React.FC<GameComponentProps> = ({ roomId }) => {
    const { messages, sendMessage } = useWebSocket(roomId);
    const [input, setInput] = useState<string>('');

    const handleSend = () => {
        sendMessage({ text: input });
        setInput('');
    };

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSend}>Send</button>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.text}</div>
                ))}
            </div>
        </div>
    );
};

export default BlitzModeMainScreen;
