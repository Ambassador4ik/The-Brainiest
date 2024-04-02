import styles from './roomList.module.css'
import RoomItem from "./Components/roomItem/roomItem.tsx";

const roomList = ({rooms}: {rooms: Array<{id: string, name: string, playerCount: number, maxPlayers: number}>}) => {
    return (
        <div className={styles.container}>
            {rooms.map((room) => (
                <RoomItem id={room.id} key={room.id} name={room.name} playerCount={room.playerCount} maxPlayers={room.maxPlayers} />
            ))}
        </div>
    )
}

export default roomList;