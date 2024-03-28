import React from "react";
import FormComponent from "../formComponent.ts";
import styles from './formRange.module.css'

const formRange: React.FC<FormComponent> = ({label, value, onChange, disabled, min, max}) => {

    return (
        <div className={styles.container}>
            <p className={styles.name}>{label}</p>
            <input
                className={styles.input}
                onChange={onChange}
                disabled={disabled}
                type='range'
                min={min}
                max={max}
                defaultValue={value}
            />
            <p className={styles.number}>{value}</p>
        </div>
    )
}

export default formRange;