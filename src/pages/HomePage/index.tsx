import React, { useEffect, useState } from 'react';
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
import Field from '@components/Field/Input';
import type { Moment } from 'moment';
const HomePage = () => {
    const { events, isLoading, code } = useAppSelector((state) => state.eventReducer);
    const { isAuth, role } = useAppSelector((state) => state.authReducer);
    const [searchText, setSearchText] = useState<string>('');
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [startTime, setStartTime] = useState<Moment | undefined>();
    const [endTime, setEndTime] = useState<Moment | undefined>();
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    const handleStartTime = (date: moment.Moment | undefined) => {
        setStartTime(date);
    };
    const handleEndTime = (date: moment.Moment | undefined) => {
        setEndTime(date);
    };
    useEffect(() => {
        !isAuth ? navigate('/auth/sign-in') : dispatch(fetchEvents());
    }, [isAuth]);

    useEffect(() => {
        if (code == 401) {
            dispatch(clearSession());
            navigate('/auth/sign-in');
        }
    }, []);
    const handleSubmit = () => {
        dispatch(
            fetchEvents(
                startTime?.format('YYYY-MM-DDTHH:mm:ss'),
                endTime?.format('YYYY-MM-DDTHH:mm:ss'),
            ),
        );
    };
    useEffect(() => {
        setFilteredEvents(
            searchText.trim() != ''
                ? events.filter((event) =>
                      event.title.toLowerCase().includes(searchText.toLowerCase()),
                  )
                : events,
        );
        console.log('filtered');
    }, [searchText, events]);
    return (
        <section className={styles.homePage}>
            <div className={styles.eventContainer}>
                {filteredEvents && filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => {
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
                    <Field
                        placeholder='Поиск по названию'
                        value={searchText}
                        onChange={handleSearchText}
                    />
                    <Filter
                        startTime={startTime}
                        endTime={endTime}
                        setStartTime={handleStartTime}
                        setEndTime={handleEndTime}
                        handleSubmit={handleSubmit}
                    />
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
