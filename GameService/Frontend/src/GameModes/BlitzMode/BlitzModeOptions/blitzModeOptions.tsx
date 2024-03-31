import RoomOptionsForm from "../../RoomOptions/roomOptionsForm.tsx";
import { FormComponentData } from "../../RoomOptions/Components/formComponent.ts";
import styles from './blitzModeOptions.module.css'
import axios from "axios";

const blitzModeOptions = () => {
    const elements: FormComponentData[] = [
        { label: 'Название комнаты:', value: '', name: 'room_name', type: 'input' },
        //{ label: 'Игрок-ведущий', value: 0, name: 'player-host', type: 'checkbox' },
        //{ label: 'Дополнительный конкурс', value: 0, name: 'additional-quiz', type: 'checkbox' },
        //{ label: 'Дополнительные вопросы', value: 0, name: 'additional-questions', type: 'checkbox' },
        { label: 'Количество игроков', value: '12', name: 'player_count', type: 'range', min: 1, max: 12 },
        { label: 'Количество вопросов', value: '18', name: 'question_count', type: 'range', min: 4, max: 24 },
        { label: 'Время на размышление (сек)', value: '5', name: 'time_per_question', type: 'range', min: 2, max: 15 },
    ]

    const handleSubmit = async (data: Record<string, string | number>) => {
        await axios.post('http://localhost:3002/room/create', data, {
            withCredentials: true
        })
        console.log("Form Data:", data);
    };

    return (
        <div className={styles.container}>
            <RoomOptionsForm elements={elements} onSubmit={handleSubmit} />
        </div>
    )
}

export default blitzModeOptions;