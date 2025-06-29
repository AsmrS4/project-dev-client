import { useEffect, useState } from 'react';
import styles from './Event.module.scss';
import ImageCarousel from '@components/ImageCarousel';
import { useNavigate, useParams } from 'react-router-dom';
import type { IEvent } from 'src/models/Event/Event';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';

import { ActionButton } from '@components/Button';
import { DateConverter } from '@utils/converter/DateConverter';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
import EmptyAnswer from '@components/Message/Answer';

const EventPage = () => {
    const { id } = useParams();
    const dateConverter: DateConverter = new DateConverter();
    const { token, role } = useAppSelector((state) => state.authReducer);
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const [eventDetails, setDetails] = useState<IEvent>({
        id: '',
        images: [],
        title: '',
        description: '',
        dateTime: [],
        createTime: [],
        address: '',
        status: '',
    });
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const checkHasBooking = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/booking/check/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsBooked(response.data == true);
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status == 401) {
                dispatch(clearSession());
                navigate('/auth/sign-in');
            }
            console.log(error);
        }
    };
    const cancelEvent = async () => {
        try {
            await axios({
                url: `http://localhost:8090/api/event/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDetails((prev) => ({ ...prev, status: 'CANCELED' }));
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status == 401) {
                    dispatch(clearSession());
                    navigate('/auth/sign-in');
                }
                if (error.response.status == 403) {
                    navigate('/error/forbidden');
                }
                if (error.response.status == 404) {
                    console.log('here');
                    navigate('*');
                }
                if (error.response.status == 500) {
                    navigate('/error/server');
                }
            }
            console.log(error);
        }
    };
    const bookEvent = async () => {
        try {
            await axios({
                url: `http://localhost:8090/api/booking/${id}`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            checkHasBooking();
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                if (error instanceof AxiosError && error.response) {
                    if (error.response.status == 401) {
                        dispatch(clearSession());
                        navigate('/auth/sign-in');
                    }
                    if (error.response.status == 403) {
                        navigate('/error/forbidden');
                    }
                    if (error.response.status == 404) {
                        console.log('here');
                        navigate('*');
                    }
                    if (error.response.status == 500) {
                        navigate('/error/server');
                    }
                }
                console.log(error);
            }
        }
    };
    const fetchDetails = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/event/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDetails(response.data);
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                if (error instanceof AxiosError && error.response) {
                    if (error.response.status == 401) {
                        dispatch(clearSession());
                        navigate('/auth/sign-in');
                    }
                    if (error.response.status == 403) {
                        navigate('/error/forbidden');
                    }
                    if (error.response.status == 404) {
                        console.log('here');
                        navigate('*');
                    }
                    if (error.response.status == 500) {
                        navigate('/error/server');
                    }
                }
                console.log(error);
            }
            console.log(error);
        }
    };
    useEffect(() => {
        fetchDetails();
        checkHasBooking();
        console.log(eventDetails);
    }, []);
    return (
        <section className={styles.eventPage}>
            <div className={styles.eventHeader}>
                <h1>{eventDetails.title}</h1>
                {eventDetails.status === 'ACTIVE' &&
                    (role === 'CLIENT' ? (
                        <ActionButton
                            title={isBooked ? 'Уже забронировано' : 'Забронировать'}
                            type={'submit'}
                            onClick={bookEvent}
                            disabled={isBooked}
                        ></ActionButton>
                    ) : role === 'MANAGER' ? (
                        <div className={styles.wrapper}>
                            <ActionButton
                                title={'Редактировать'}
                                type={'submit'}
                                onClick={() => {
                                    navigate(`/edit/event/${id}`);
                                }}
                            ></ActionButton>
                            <ActionButton
                                title={'Отменить'}
                                type={'submit'}
                                onClick={() => {
                                    cancelEvent();
                                }}
                            ></ActionButton>
                        </div>
                    ) : (
                        <></>
                    ))}
            </div>
            <ImageCarousel images={eventDetails.images}></ImageCarousel>
            <div className={styles.eventContainer}>
                <div className={styles.details}>
                    {eventDetails.status !== 'CANCELED' ? (
                        <>
                            <div className={styles.detailItem}>
                                <h1>О мероприятии</h1>
                                <p>{eventDetails.description}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h1>Место проведения</h1>
                                <p>{eventDetails.address}</p>
                            </div>
                            <div className={styles.detailItem}>
                                <h1>Дата</h1>
                                <p>
                                    {dateConverter.convertToLocaleString(
                                        dateConverter.formattedDate(eventDetails.dateTime),
                                    )}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <EmptyAnswer message={'Мероприятие недоступно'} />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventPage;
