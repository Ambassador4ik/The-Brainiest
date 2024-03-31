import styles from './roomItem.module.css'

const roomItem = ({name, playerCount, maxPlayers}: {name: string, playerCount: number, maxPlayers: number}) => {
    return (
        <div className={styles.container}>
            <p className={styles.roomName}>{name}</p>
            <p>{playerCount}/{maxPlayers}</p>
        </div>
    )
}

export default roomItem;