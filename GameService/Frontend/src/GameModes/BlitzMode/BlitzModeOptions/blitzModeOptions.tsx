import RoomOptionsForm from "../../RoomOptions/roomOptionsForm.tsx";
import { FormComponentData } from "../../RoomOptions/FormComponents/formComponent.ts";
import styles from './blitzModeOptions.module.css'

const blitzModeOptions = () => {
    const elements: FormComponentData[] = [
        { label: 'Название комнаты:', value: '', name: 'room-name', type: 'input' },
        { label: 'Игрок-ведущий', value: 0, name: 'player-host', type: 'checkbox' },
        { label: 'Дополнительный конкурс', value: 0, name: 'additional-quiz', type: 'checkbox' },
        { label: 'Дополнительные вопросы', value: 0, name: 'additional-questions', type: 'checkbox' },
        { label: 'Количество вопросов', value: '18', name: 'question-count', type: 'range', min: 4, max: 24 },
        { label: 'Время на размышление (сек)', value: '5', name: 'time-per-question', type: 'range', min: 2, max: 15 },
    ]

    const handleSubmit = (data: Record<string, string | number>) => {
        console.log("Form Data:", data);
    };

    return (
        <div className={styles.container}>
            <RoomOptionsForm elements={elements} onSubmit={handleSubmit} />
        </div>
    )
}

export default blitzModeOptions;