import styles from './aboutPage.module.css'

const aboutPage = () => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Об Игре</p>
            <p className={styles.paragraph}>The Brainiest - онлайн игра по мотивам телешоу "Самый Умный".</p>
            <p className={styles.paragraph}>Соревнуйтесь с другими игроками в интеллектуальных баталиях, узнавайте новое и приятно проводите время с друзьями!</p>
        </div>
    )
};

export default aboutPage;