import NavigationBar from "../NavigationBar/navigationBar.tsx";
import { useEffect, useState } from "react";
import { fetchUserProfile, fetchUserRatings } from "../common/userProfileHandlers.ts";
import { AxiosError } from "axios";
import styles from './userProfile.module.css';

const UserProfile = () => {
    const [profileData, setProfileData] = useState('');
    const [ratingsData, setRatingsData] = useState({ username: '', games_played: 0, games_won: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const profile = await fetchUserProfile();
                if (!profile) throw new Error('Profile not found');
                setProfileData(profile);

                const ratings = await fetchUserRatings();
                if (!ratings) throw new Error('Ratings not found');
                setRatingsData(ratings);
            } catch (err) {
                if (err instanceof AxiosError) {
                    setError(err.message);
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Unknown error');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={styles.out}>
            <NavigationBar />
            <div className={styles.container}>
                <h3 className={styles.header}>User Ratings</h3>
                <p className={styles.dataPoint}>Username: {ratingsData.username}</p>
                <p className={styles.dataPoint}>Games Played: {ratingsData.games_played}</p>
                <p className={styles.dataPoint}>Games Won: {ratingsData.games_won}</p>
            </div>
        </div>
    );
}

export default UserProfile;
