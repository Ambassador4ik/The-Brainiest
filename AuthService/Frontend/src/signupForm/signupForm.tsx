import React, { useState, useCallback } from 'react';
import axios from 'axios';
import styles from './signupForm.module.css';
import getDeviceIdentifier from "../common/deviceIdWorkers.ts";

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleLoginChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleRepeatPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== repeatPassword) return;

        try {
            const deviceID = getDeviceIdentifier();
            const response = await axios.post('http://localhost:3000/auth/signup', {
                username: username,
                password: password,
                deviceIdentifier: deviceID
            }, {
                withCredentials: true
            });
            console.log(response.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('There was an error!', error.response?.data || error.message);
            } else {
                console.error('Unexpected error', error);
            }
        }
    };

    return (
        <form className={styles.signupForm} onSubmit={handleSubmit}>
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
            <input
                className={styles.repeatPasswordEntry}
                onChange={handleRepeatPasswordChange}
                value={repeatPassword}
                type="password"
                id="repeat-password"
                placeholder="Повтор Пароля"
                aria-label="Повтор Пароля"
            />
            <button className={styles.signupButton} type="submit">Регистрация</button>
            <p className={styles.alreadyRegisteredLabel}>
                Уже есть аккаунт? <a className={styles.loginLabel} href="/auth/login">Войти</a>
            </p>
        </form>
    );
};

export default SignupForm;
