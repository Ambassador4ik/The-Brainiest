import React from "react";
import FormComponent from "../formComponent.ts";
import styles from './formInput.module.css'

const formInput: React.FC<FormComponent> = ({label, value, onChange, disabled}) => {

    return (
        <div className={styles.container}>
            <p className={styles.name}>{label}</p>
            <input
                className={styles.input}
                onChange={onChange}
                disabled={disabled}
                type='text'
                value={value}
            />
        </div>
    )
}

export default formInput;