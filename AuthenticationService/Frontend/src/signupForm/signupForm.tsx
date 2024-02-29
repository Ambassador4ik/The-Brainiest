import styles from './signupForm.module.css'
import React, {ChangeEvent, FormEvent} from "react";

import { getRequestOptions } from "../util/requestUtils.ts";
import RequestType from "../util/requestType.ts";
import ISignupFormState from "./ISignupFormState.ts";

class SignupForm extends React.Component<{}, ISignupFormState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeat_password: ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRepeatPasswordChange = this.handleRepeatPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value });
    }

    handleRepeatPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ repeat_password: event.target.value });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (this.state.password !== this.state.repeat_password) return
        fetch('http://localhost:3000/auth/signup', getRequestOptions(RequestType.POST,
            {'username': this.state.username, 'password': this.state.password}))
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                console.log(data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    render() {
        return (
            <form className={styles.signupForm} onSubmit={this.handleSubmit}>
                <div className={styles.titleLabel}>The Brainiest</div>
                <input className={styles.loginEntry} onChange={this.handleLoginChange} type="text" id="username" placeholder="Логин" aria-label="Логин"/>
                <input className={styles.passwordEntry} onChange={this.handlePasswordChange} type="password" id="password" placeholder="Пароль"
                       aria-label="Пароль"/>
                <input className={styles.repeatPasswordEntry} onChange={this.handleRepeatPasswordChange} type="password" id="repeat-password"
                       placeholder="Повтор Пароля" aria-label="Повтор Пароля"/>
                <button className={styles.signupButton} type="submit">Регистрация</button>
                <p className={styles.alreadyRegisteredLabel}>Уже есть аккаунт? <a className={styles.loginLabel}
                                                                                  href="/auth/login">Войти</a>
                </p>
            </form>
        )
    }
}

export default SignupForm