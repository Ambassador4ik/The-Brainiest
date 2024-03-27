import NavigationBar from "../NavigationBar/navigationBar.tsx";
import {useEffect, useState} from "react";
import {fetchUserProfile} from "../common/userProfileHandlers.ts";
import {AxiosError} from "axios";

const userProfile = () => {
    //@ts-ignore
    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Replace the URL with your actual data fetching URL
                const profile = await fetchUserProfile()
                if (!profile) throw Error;
                setData(profile);
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
        <div>
            <NavigationBar></NavigationBar>
        </div>
    )
}

export default userProfile