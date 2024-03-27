import React from "react";

interface FormComponent {
    label: string;
    value: string | number;
    disabled?: boolean;
    min?: number;
    max?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

type BaseFormComponentData = {
    label: string;
    name: string;
    value: string | number;
    disabled?: boolean;
    [key: string]: any; // Allowing any additional properties
};

// Specific extension for 'input' and 'checkbox' types
type SpecificFormComponentData<T extends 'input' | 'checkbox' | 'range'> = T extends 'range'
    ? {
    type: T;
    min: number; // Additional required properties for 'range'
    max: number;
} & BaseFormComponentData // Combine with base type
    : {
    type: T;
} & BaseFormComponentData;

type FormComponentData = SpecificFormComponentData<'input' | 'checkbox' | 'range'>;

export default FormComponent;
export type { FormComponentData }