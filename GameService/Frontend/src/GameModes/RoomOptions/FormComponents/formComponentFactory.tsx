import {FormComponentData} from "./formComponent.ts";
import FormInput from "./FormInput/formInput.tsx";
import React from "react";
import FormCheckbox from "./FormCheckbox/formCheckbox.tsx";
import FormRange from "./FormRange/formRange.tsx";

class FormComponentFactory {
    static createFormComponent = (data: FormComponentData, index: number, onChange: (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void) => {
        switch (data.type) {
            case 'input':
                return (
                    <FormInput
                        key={index}
                        label={data.label}
                        value={data.value}
                        onChange={(event) => onChange(index, event)}
                        disabled={data.disabled}
                    />
                )
            case 'checkbox':
                return (
                    <FormCheckbox
                        key={index}
                        label={data.label}
                        value={data.value}
                        onChange={(event) => onChange(index, event)}
                        disabled={data.disabled}
                    />
                )
            case 'range':
                return (
                    <FormRange
                        key={index}
                        label={data.label}
                        value={data.value}
                        min={data.min}
                        max={data.max}
                        onChange={(event) => onChange(index, event)}
                        disabled={data.disabled}
                    />
                )
        }
    }
}

export default FormComponentFactory;
