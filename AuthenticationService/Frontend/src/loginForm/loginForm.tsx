import styles from './loginForm.module.css'
import React, {ChangeEvent, FormEvent} from "react";

import { getRequestOptions } from "../util/requestUtils.ts";
import RequestType from "../util/requestType.ts";
import ILoginFormState from "./ILoginFormState.ts"

class LoginForm extends React.Component<{}, ILoginFormState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLoginChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        fetch('http://localhost:3000/auth/login', getRequestOptions(RequestType.POST, this.state))
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
            <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                <div className={styles.titleLabel}>The Brainiest</div>
                <input className={styles.loginEntry} onChange={this.handleLoginChange} type="text" id="username" placeholder="Логин" aria-label="Логин"/>
                <input className={styles.passwordEntry} onChange={this.handlePasswordChange} type="password" id="password" placeholder="Пароль" aria-label="Пароль"/>
                <button className={styles.loginButton} type="submit">Вход</button>
                <p className={styles.noAccountLabel}>Нет аккаунта? <a className={styles.signupLabel} href="/auth/signup">Регистрация</a></p>
            </form>
        )
    }
}
export default LoginForm