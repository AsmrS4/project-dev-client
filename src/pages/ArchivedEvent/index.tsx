import React, { useEffect, useState } from 'react';
import styles from './ArchivedEvent.module.scss';
import ImageCarousel from '@components/ImageCarousel';
import { useNavigate, useParams } from 'react-router-dom';
import type { IEvent } from 'src/models/Event/Event';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';
import { DateConverter } from '@utils/converter/DateConverter';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';

const ArhivedEventPage = () => {
    const { id } = useParams();
    const dateConverter: DateConverter = new DateConverter();
    const { token, role } = useAppSelector((state) => state.authReducer);

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

    const fetchDetails = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/history/event/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDetails(response.data);
            console.log(response);
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof AxiosError && error.response) {
                switch (error.response.status) {
                    case 401: {
                        dispatch(clearSession());
                        navigate('/auth/sign-in');
                        break;
                    }
                    case 403: {
                        navigate('/error/forbidden');
                        break;
                    }

                    default: {
                        navigate('/error/server');
                    }
                }
            }
        }
    };
    useEffect(() => {
        fetchDetails();
        console.log(eventDetails);
    }, []);
    return (
        <section className={styles.eventPage}>
            <div className={styles.eventHeader}>
                <h1>{eventDetails.title}</h1>
            </div>
            <ImageCarousel images={eventDetails.images}></ImageCarousel>
            <div className={styles.eventContainer}>
                <div className={styles.details}>
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
                </div>
            </div>
        </section>
    );
};

export default ArhivedEventPage;
