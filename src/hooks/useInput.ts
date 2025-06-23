import { useState } from "react";
import { useValidation } from "./useValidation.ts";

interface InputInitProps {
    initialValue: string | number | null;
    validations: any;
    type: string | 'text',
    label: string;
    placeholder?: string;
}

export const useInput = (props: InputInitProps) => {
    const [value, setValue] = useState<string | number | null >(props.initialValue);
    const label : string = props.label;
    const type : string = props.type;
    const placeholder: string = props.placeholder ?? "";

    const valid = useValidation(value, props.validations);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    
    return { value, onChange, label, type, placeholder, ...valid };
};