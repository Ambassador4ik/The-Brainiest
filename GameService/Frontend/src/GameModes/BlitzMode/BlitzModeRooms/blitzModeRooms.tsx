//import styles from './blitzModeRooms.module.css'
import RoomList from "../../RoomList/roomList.tsx";

const blitzModeRooms = () => {
    const rooms = [
        {name: "Room 1"},
        {name: "Room 2"}
    ]

    return (
        <RoomList rooms={rooms} />
    )
}

export default blitzModeRooms;