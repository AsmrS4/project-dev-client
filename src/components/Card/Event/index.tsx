import React from 'react';
import styles from './Event.module.scss';

import Button from '@components/Button';
import { DateConverter } from '@utils/converter/DateConverter';
interface EventCardProps {
    title: string;
    description: string;
    dateTime: string;
    id: string;
    image: string;
}
const EventCard: React.FC<EventCardProps> = ({ title, description, dateTime, id, image }) => {
    const dateConverter: DateConverter = new DateConverter();
    return (
        <div className={styles.eventCard}>
            <div className={styles.eventImg}>
                <img src={image} alt='party' />
            </div>
            <div className={styles.eventContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={styles.eventFooter}>
                    <p>Дата: {dateConverter.convertToLocaleString(dateTime)}</p>
                    <Button title={'Детали'} type='button' />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
