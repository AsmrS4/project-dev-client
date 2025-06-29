import { useEffect, useState } from 'react';
import styles from './ArchivedEvent.module.scss';
import ImageCarousel from '@components/ImageCarousel';
import { useNavigate, useParams } from 'react-router-dom';
import type { IEvent } from 'src/models/Event/Event';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';
import { DateConverter } from '@utils/converter/DateConverter';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';

interface ReviewProps {
    reviews: any[];
    totalRating: number;
}

const ArhivedEventPage = () => {
    const { id } = useParams();
    const dateConverter: DateConverter = new DateConverter();
    const { token, role } = useAppSelector((state) => state.authReducer);
    const [ratingClass, setClass] = useState<string>('');

    const [reviews, setReviews] = useState<ReviewProps>({
        reviews: [],
        totalRating: 0.0,
    });
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
    const fetchReviews = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/history/event/${id}/reviews`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setReviews(response.data);
        } catch (error) {
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
        fetchReviews();
        console.log(eventDetails);
    }, []);
    useEffect(() => {
        if (reviews.totalRating == 0) {
            return setClass('default');
        }
        if (reviews.totalRating > 0 && reviews.totalRating < 3.0) {
            return setClass('bad');
        }
        if (reviews.totalRating >= 3.0 && reviews.totalRating <= 4.2) {
            return setClass('good');
        }
        if (reviews.totalRating > 4.2) {
            return setClass('great');
        }
    }, [reviews]);
    return (
        <section className={styles.eventPage}>
            <div className={styles.eventHeader}>
                <h1>{eventDetails.title}</h1>
            </div>
            <div className={styles.carouselWrapper}>
                <div className={styles.rating}>
                    <span className={ratingClass}>{reviews.totalRating}</span>
                </div>
                <ImageCarousel images={eventDetails.images}></ImageCarousel>
            </div>
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
