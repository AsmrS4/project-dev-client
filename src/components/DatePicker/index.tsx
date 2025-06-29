import { DatePicker } from 'antd';
import React from 'react';
import styles from './DateInput.module.scss';
import moment from 'moment';

interface DateProps {
    showTime?: boolean;
    label: string;
    value: moment.Moment | undefined;
    disableBeforeStart?: moment.Moment | undefined;
    onChange: (date: moment.Moment | undefined) => void;
}

const disabledHistoryDates = (current: moment.Moment) => {
    return current && current.isBefore(moment(), 'day');
};

const disableBeforeStartDate = (startDate: moment.Moment) => (current: moment.Moment) => {
    return current && current.isBefore(startDate, 'day');
};

const DatePickerComp: React.FC<DateProps> = ({
    label,
    value,
    showTime = true,
    onChange,
    disableBeforeStart,
}) => {
    return (
        <div className={styles.dateInput}>
            <label className={styles.dateInput__label}>{label}</label>
            <DatePicker
                className={styles.dateInput__input}
                defaultValue={value}
                disabledDate={
                    disableBeforeStart
                        ? disableBeforeStartDate(disableBeforeStart)
                        : disabledHistoryDates
                }
                placeholder='Укажите дату'
                showTime={showTime}
                onChange={onChange}
                size='large'
            />
        </div>
    );
};

export default DatePickerComp;
