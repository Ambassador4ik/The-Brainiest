import React from "react";
import FormComponent from "../formComponent.ts";
import styles from './formCheckbox.module.css'

const formCheckbox: React.FC<FormComponent> = ({label, value, onChange, disabled}) => {

    return (
        <div className={styles.container}>
            <p className={styles.name}>{label}</p>
            <input
                className={styles.input}
                onChange={onChange}
                disabled={disabled}
                type='checkbox'
                value={value}
            />
        </div>
    )
}

export default formCheckbox;