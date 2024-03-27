import React, { useState} from "react";
import styles from './roomOptionsForm.module.css';
import  {FormComponentData} from "./FormComponents/formComponent.ts";
import FormComponentFactory from "./FormComponents/formComponentFactory.tsx";

const RoomOptionsForm = (config: {elements: FormComponentData[], onSubmit: (data: Record<string, string | number>) => void}) => {
    const [elementsData, setElementsData] = useState<FormComponentData[]>(config.elements)

    const handleParentChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const newElementsData = [...elementsData];
        switch (newElementsData[index].type) {
            case 'input':
                newElementsData[index].value = event.target.value;
                break
            case 'checkbox':
                newElementsData[index].value = Number((!Boolean(newElementsData[index].value)))
                break
            case 'range':
                newElementsData[index].value = event.target.value;
                break
            default:
        }
        setElementsData(newElementsData)
    }

    const getFormData = () => {
        return elementsData.reduce((acc, component) => {
            acc[component.name] = component.value;
            return acc;
        }, {} as Record<string, string | number>);
    }

    const handleSubmit = () => {
        config.onSubmit(getFormData())
    }

    return (
        <div className={styles.container}>
            <div className={styles.elementsContainer}>
                <p className={styles.title}>Новая Комната</p>
                {elementsData.map((data, index) => (
                    FormComponentFactory.createFormComponent(data, index, handleParentChange)
                ))}
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={handleSubmit}>Создать Комнату</button>
            </div>
        </div>
    )
}

export default RoomOptionsForm;