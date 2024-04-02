import styles from './mainPage.module.css'

const mainPage = () => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>The Brainiest</p>
            <div className={styles.buttonsContainer}>
                <a className={styles.loginButton} href='/auth/login'>Вход</a>
                <a className={styles.signupButton} href='/auth/signup'>Регистрация</a>
            </div>
        </div>
    )
};

export default mainPage;