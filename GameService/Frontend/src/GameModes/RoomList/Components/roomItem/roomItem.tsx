import styles from './roomItem.module.css'

const roomItem = ({id, name, playerCount, maxPlayers}: {id: string, name: string, playerCount: number, maxPlayers: number}) => {
    return (
        <a className={styles.container} href={`/game/room/${id}`}>
            <p className={styles.roomName}>{name}</p>
            <p>{playerCount}/{maxPlayers}</p>
        </a>
    )
}

export default roomItem;