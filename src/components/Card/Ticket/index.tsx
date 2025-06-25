import React from 'react';
import styles from './Ticket.module.scss';
import { ActionButton } from '@components/Button';
const TicketCard = () => {
    return (
        <div className={styles.ticketCard}>
            <div className={styles.ticketBody}>
                <h1 className={styles.ticketTitle}>Мероприятие</h1>
                <div className={styles.ticketContent}>
                    <p>Место проведения</p>
                    <p>Статус</p>
                    <ActionButton
                        title='Перейти на страницу'
                        type='button'
                        onClick={() => {}}
                    ></ActionButton>
                </div>
            </div>
            <div className={styles.ticketFooter}>
                <p>12 июня 2025</p>
            </div>
        </div>
    );
};

export default TicketCard;
