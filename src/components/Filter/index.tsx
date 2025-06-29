import Button, { ActionButton } from '@components/Button';
import styles from './Filter.module.scss';
import DatePickerComp from '@components/DatePicker';
import React, { useEffect, useState } from 'react';
import type { Moment } from 'moment';

interface FilterProps {
    startTime: Moment | undefined;
    endTime: Moment | undefined;
    setStartTime: any;
    setEndTime: any;
    handleSubmit: any;
}

const Filter: React.FC<FilterProps> = ({
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    handleSubmit,
}) => {
    useEffect(() => {
        if (startTime && endTime) {
            if (startTime.format('YYYY-MM-DDTHH:mm:ss') >= endTime.format('YYYY-MM-DDTHH:mm:ss')) {
                setEndTime(startTime);
            }
        }
    }, [startTime]);
    return (
        <div className={styles.filter}>
            <h5 className={styles.filterTitle}>Фильтр</h5>
            <div className={styles.filterFieldsWrapper}>
                <DatePickerComp
                    label={'От'}
                    value={startTime}
                    onChange={setStartTime}
                    showTime={false}
                />
                <DatePickerComp
                    label={'По'}
                    value={endTime}
                    disableBeforeStart={startTime}
                    onChange={setEndTime}
                    showTime={false}
                />
            </div>
            <ActionButton title='Применить' type='button' onClick={handleSubmit} />
        </div>
    );
};

export default Filter;
