import { DatePicker } from 'antd';
import React from 'react';
import styles from './DateInput.module.scss';

interface DateProps {
    label: string;
    value: moment.Moment | undefined;
    onChange: (date: moment.Moment | undefined) => void;
}
const DatePickerComp: React.FC<DateProps> = ({ label, value, onChange }) => {
    return (
        <div className={styles.dateInput}>
            <label className={styles.dateInput__label}>{label}</label>
            <DatePicker
                className={styles.dateInput__input}
                defaultValue={value}
                showTime
                onChange={onChange}
                size='large'
            />
        </div>
    );
};

export default DatePickerComp;
