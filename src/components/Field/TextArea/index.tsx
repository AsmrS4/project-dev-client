import React from 'react';
import styles from '../Field.module.scss';
import TextArea from 'antd/es/input/TextArea';

interface TextAreaProps {
    label: string;
    value: string | number | undefined;
    placeholder?: string | '';
    onChange: (value: any) => void;
}
const TextAreaComp: React.FC<TextAreaProps> = ({ label, value, onChange, placeholder }) => {
    return (
        <div className={styles.inputField}>
            <label className={styles.inputField__label}>{label}</label>
            <TextArea value={value} onChange={onChange} placeholder={placeholder} rows={4} />
        </div>
    );
};

export default TextAreaComp;
