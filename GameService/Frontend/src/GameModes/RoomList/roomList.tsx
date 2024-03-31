import styles from './roomList.module.css'
import RoomItem from "./Components/roomItem/roomItem.tsx";

const roomList = ({rooms}: {rooms: Array<{name: string, playerCount: number, maxPlayers: number}>}) => {
    return (
        <div className={styles.container}>
            {rooms.map((room, index) => (
                <RoomItem key={index} name={room.name} playerCount={room.playerCount} maxPlayers={room.maxPlayers} />
            ))}
        </div>
    )
}

export default roomList;