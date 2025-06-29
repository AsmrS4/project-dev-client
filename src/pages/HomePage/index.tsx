import React, { useEffect } from 'react';
import styles from './HomePage.module.scss';
import Filter from '@components/Filter';
import EventCard from '@components/Card/Event';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { fetchEvents } from '@store/Event/EventActionCreator';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '@store/User/AuthReducer';
import EmptyAnswer from '@components/Message/Answer';
import { ActionButton } from '@components/Button';
const HomePage = () => {
    const { events, isLoading, code } = useAppSelector((state) => state.eventReducer);
    const { isAuth, role } = useAppSelector((state) => state.authReducer);
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
                {events && events.length > 0 ? (
                    events.map((event) => {
                        return <EventCard key={event.id} {...event} />;
                    })
                ) : (
                    <>
                        <EmptyAnswer message={'Мероприятия не найдены'}></EmptyAnswer>
                    </>
                )}
            </div>
            {role != 'SECURITY' && (
                <div className={styles.wrapper}>
                    <Filter />
                    {role == 'MANAGER' && (
                        <ActionButton
                            title={'Создать мероприятие'}
                            type={'button'}
                            onClick={() => {
                                navigate('/create/event');
                            }}
                        />
                    )}
                </div>
            )}
        </section>
    );
};

export default HomePage;
