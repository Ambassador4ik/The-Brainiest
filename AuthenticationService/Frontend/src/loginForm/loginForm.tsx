import React, {useCallback, useState} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
//import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, setCookie] = useCookies(['accessToken', 'refreshToken']);
    //const navigate = useNavigate();

    const handleLoginChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
            const {accessToken, refreshToken} = response.data;
            setCookie('accessToken', accessToken, { path: '/' });
            setCookie('refreshToken', refreshToken, { path: '/' });
            window.location.href = 'http://localhost:3001/user/profile';
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('There was an error!', error.response?.data || error.message);
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.titleLabel}>The Brainiest</div>
            <input
                className={styles.loginEntry}
                onChange={handleLoginChange}
                value={username}
                type="text"
                id="username"
                placeholder="Логин"
                aria-label="Логин"
            />
            <input
                className={styles.passwordEntry}
                onChange={handlePasswordChange}
                value={password}
                type="password"
                id="password"
                placeholder="Пароль"
                aria-label="Пароль"
            />
            <button className={styles.loginButton} type="submit">Вход</button>
            <p className={styles.noAccountLabel}>
                Нет аккаунта? <a className={styles.signupLabel} href="/auth/signup">Регистрация</a>
            </p>
        </form>
    );
};

export default LoginForm;