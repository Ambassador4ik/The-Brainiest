import  { useEffect, useState } from 'react';
import axios from 'axios';
import RoomList from '../../RoomList/roomList.tsx';

const blitzModeRooms = () => {
    // Define the state to hold rooms data
    const [rooms, setRooms] = useState([]);

    // Fetch rooms from the backend on component mount
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:3002/room/get-all', {
                    withCredentials: true
                });
                // Transform the data to include player count
                // @ts-ignore
                const roomsWithPlayerCount = response.data.map(room => ({
                    name: room.name,
                    maxPlayers: room.player_count,
                    playerCount: room.players.length,
                }));
                setRooms(roomsWithPlayerCount);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <RoomList rooms={rooms} />
    );
};

export default blitzModeRooms;
