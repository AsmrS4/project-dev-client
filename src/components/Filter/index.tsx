import React from 'react';
import styles from './Filter.module.scss';
import Field from '@components/Field/Input';
import Button from '@components/Button';
const Filter = () => {
    const date = {
        label: 'От',
        type: 'date',
        value: '2025-06-12',
        onChange: () => {},
    };
    const dateNext = {
        label: 'По',
        type: 'date',
        value: '2025-06-18',
        onChange: () => {},
    };
    return (
        <div className={styles.filter}>
            <div className={styles.filterFieldsWrapper}>
                <h5 className={styles.filterTitle}>Фильтр</h5>
                <Field {...date} />
                <Field {...dateNext} />
            </div>
            <Button title='Применить' type='button' />
        </div>
    );
};

export default Filter;
