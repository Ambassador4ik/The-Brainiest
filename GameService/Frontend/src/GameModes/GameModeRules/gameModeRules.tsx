import styles from './gameModeRules.module.css'
const GameModeRules = (config: {content: string[]}) => {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Правила</p>
            {config.content.map((data, index) => (
                <p className={styles.content} key={index}>{data}</p>
            ))}
        </div>
    )
}

export default GameModeRules