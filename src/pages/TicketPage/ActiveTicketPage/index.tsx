import React from 'react';
import styles from '../TicketPage.module.scss';
import TicketCard from '@components/Card/Ticket';

const ActiveTicketPage = () => {
    return (
        <section className={styles.ticketPage}>
            <div className={styles.pageHeader}></div>
            <div className={styles.ticketContainer}>
                <TicketCard></TicketCard>
                <TicketCard></TicketCard>
                <TicketCard></TicketCard>
            </div>
        </section>
    );
};

export default ActiveTicketPage;
