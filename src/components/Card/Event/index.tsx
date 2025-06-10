import React from 'react';
import styles from './Event.module.scss';

import Button from '@components/Button';
interface EventCardProps {
    title: string;
    description: string;
    dateTime: string;
    id: string;
    image: string;
}
const EventCard: React.FC<EventCardProps> = ({ title, description, dateTime, id, image }) => {
    return (
        <div className={styles.eventCard}>
            <div className={styles.eventImg}>
                <img src={image} alt='party' />
            </div>
            <div className={styles.eventContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={styles.eventFooter}>
                    <p>Дата: {dateTime}</p>
                    <Button title={'Детали'} type='button' />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
