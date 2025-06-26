import React from 'react';
import styles from './Event.module.scss';

import { LinkButton } from '@components/Button';
import { DateConverter } from '@utils/converter/DateConverter';
import type { IEventCard } from 'src/models/Event/Event';

const EventCard: React.FC<IEventCard> = ({ title, description, dateTime, id, images }) => {
    const dateConverter: DateConverter = new DateConverter();

    return (
        <div className={styles.eventCard}>
            <div className={styles.eventImg}>
                <img src={images[0]['imageUrl']} alt='party' />
            </div>
            <div className={styles.eventContent}>
                <h3>{title}</h3>
                <div className={styles.eventFooter}>
                    <p>
                        Дата:{' '}
                        {dateConverter.convertToLocaleString(dateConverter.formattedDate(dateTime))}
                    </p>
                    <LinkButton title={'Детали'} type='button' href={`/item/${id}`} />
                </div>
            </div>
        </div>
    );
};

export default EventCard;
