import styles from './navigationBar.module.css'
import {useEffect, useState} from "react";
import {fetchNavBarContent , navBarContent} from "../common/userProfileHandlers.ts";
import {AxiosError} from "axios";

const navigationBar = () => {
    const [data, setData] = useState<navBarContent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Replace the URL with your actual data fetching URL
                const content = await fetchNavBarContent()
                if (!content) throw Error;
                setData(content);
            } catch (err) {
                if (err instanceof AxiosError) setError(err.message)
                else if (err instanceof Error) setError(err.message)
                else setError('Unknown Error')
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <nav className={styles.container}>
            <div className={styles.barContent}>
                <a className={styles.logo} href='/'>The Brainiest</a>
                <div className={styles.navigationItems}>
                    <a className={styles.navigationItem} href='/game/'>Играть</a>
                    <a className={styles.navigationItem} href='/ratings/'>Рейтинги</a>
                    <a className={styles.navigationItem} href='/about/'>Об Игре</a>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.username}>{data?.username}</p>
                    <img className={styles.profilePicture} src={data?.picture} />
                </div>
            </div>
        </nav>
    )
}

export default navigationBar;