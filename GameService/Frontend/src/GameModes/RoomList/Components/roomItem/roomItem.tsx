import styles from './roomItem.module.css'

const roomItem = ({name}: {name: string}) => {
    return (
        <div className={styles.container}>
            <p className={styles.roomName}>{name}</p>
        </div>
    )
}

export default roomItem;