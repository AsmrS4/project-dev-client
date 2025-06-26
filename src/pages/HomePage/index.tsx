import React, { useEffect } from 'react';
import styles from './HomePage.module.scss';
import Filter from '@components/Filter';
import EventCard from '@components/Card/Event';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { fetchEvents } from '@store/Event/EventActionCreator';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '@store/User/AuthReducer';
const HomePage = () => {
    const { events, isLoading, code } = useAppSelector((state) => state.eventReducer);
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        !isAuth ? navigate('/auth/sign-in') : dispatch(fetchEvents());
    }, [isAuth]);
    useEffect(() => {
        if (code == 401) {
            dispatch(clearSession());
            navigate('/auth/sign-in');
        }
    });
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
