import React from 'react';
import styles from './HomePage.module.scss';
import Filter from '@components/Filter';
import EventCard from '@components/Card/Event';
import eventImg from '@assets/event.jpg';
import eventImg2 from '@assets/event2.jpg';
const HomePage = () => {
    const events = [
        {
            title: 'Мероприятие 1',
            description:
                'Описание мероприятия: Это очень классное мероприятие. Обязательно прихродите всей семьей, мы будем вас ждать',
            dateTime: '12/06/2025',
            id: '1',
            image: eventImg,
        },
        {
            title: 'Мероприятие 2',
            description:
                'Описание мероприятия: Это очень классное мероприятие. Обязательно прихродите всей семьей, мы будем вас ждать',
            dateTime: '14/06/2025',
            id: '2',
            image: eventImg2,
        },
        {
            title: 'Мероприятие 2',
            description:
                'Описание мероприятия: Это очень классное мероприятие. Обязательно прихродите всей семьей, мы будем вас ждать',
            dateTime: '14/06/2025',
            id: '3',
            image: eventImg,
        },
    ];
    return (
        <section className={styles.homePage}>
            <div className={styles.eventContainer}>
                {events.map((event) => {
                    return <EventCard key={event.id} {...event} />;
                })}
            </div>
            <Filter />
        </section>
    );
};

export default HomePage;
