import { DatePicker } from 'antd';
import React from 'react';
import styles from './DateInput.module.scss';
import moment from 'moment';

interface DateProps {
    label: string;
    value: moment.Moment | undefined;
    onChange: (date: moment.Moment | undefined) => void;
}
const disabledFutureDates = (current: any) => {
    return current.isBefore(moment(), 'day');
};

const DatePickerComp: React.FC<DateProps> = ({ label, value, onChange }) => {
    return (
        <div className={styles.dateInput}>
            <label className={styles.dateInput__label}>{label}</label>
            <DatePicker
                className={styles.dateInput__input}
                defaultValue={value}
                disabledDate={disabledFutureDates}
                placeholder='Укажите дату'
                showTime
                onChange={onChange}
                size='large'
            />
        </div>
    );
};

export default DatePickerComp;
