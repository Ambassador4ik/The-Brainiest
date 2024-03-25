import styles from './navigationBar.module.css'

const navigationBar = () => {
    return (
        <nav className={styles.container}>
            <div className={styles.barContent}>
                <a className={styles.logo} href='#'>The Brainiest</a>
                <div className={styles.navigationItems}>
                    <a className={styles.navigationItem} href='#'>Рейтинги</a>
                    <a className={styles.navigationItem} href='#'>Правила</a>
                    <a className={styles.navigationItem} href='#'>Об Игре</a>
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.username}>Ambassador4ik</p>
                    <img className={styles.profilePicture} src='src/assets/placeholder-profile-picture.jpg' />
                </div>
            </div>
        </nav>
    )
}

export default navigationBar;