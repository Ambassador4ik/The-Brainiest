import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ratingsPage.module.css';

interface PlayerStats {
    username: string;
    games_played?: number;
    games_won?: number;
}

const ratingsPage: React.FC = () => {
    const [gamesPlayed, setGamesPlayed] = useState<PlayerStats[]>([]);
    const [gamesWon, setGamesWon] = useState<PlayerStats[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const gamesPlayedResponse = await axios.get<PlayerStats[]>('http://localhost:3002/stats/games', {withCredentials: true});
                const gamesWonResponse = await axios.get<PlayerStats[]>('http://localhost:3002/stats/wins', {withCredentials: true});
                setGamesPlayed(gamesPlayedResponse.data);
                setGamesWon(gamesWonResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className={styles.statsContainer}>
            <div className={styles.stats}>
                <h2>Games Played</h2>
                <ul>
                    {gamesPlayed.map(player => (
                        <li key={player.username}>{player.username}: {player.games_played}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.stats}>
                <h2>Games Won</h2>
                <ul>
                    {gamesWon.map(player => (
                        <li key={player.username}>{player.username}: {player.games_won}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ratingsPage;
