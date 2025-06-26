import React, { useEffect, useState } from 'react';
import styles from './Ticket.module.scss';
import './Statuses.scss';
import { ActionButton } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { DateConverter } from '@utils/converter/DateConverter';
import type { TicketProps } from 'src/models/Ticket/Ticket';
import type { IEvent } from 'src/models/Event/Event';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
const statuses = {
    ACTIVE: 'Активно',
    CANCELED: 'Отменено',
    ARCHIVED: 'Посещено',
};
const TicketCard: React.FC<TicketProps> = ({ eventId, id, status }) => {
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const [details, setDetails] = useState<IEvent>({
        id: '',
        images: [],
        title: '',
        description: '',
        dateTime: [],
        createTime: [],
        address: '',
        status: '',
    });
    const { token } = useAppSelector((state) => state.authReducer);
    const dateConverter: DateConverter = new DateConverter();
    const fetchDetails = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/event/${eventId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchDetails();
        console.log(details);
    }, []);
    const onClick = async () => {
        navigate(`/item/${eventId}`);
    };
    const cancellBooking = async () => {
        try {
            await axios({
                url: `http://localhost:8090/api/booking/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status == 401) {
                dispatch(clearSession());
                navigate('/auth/sign-in');
            }
            console.log(error);
        }
    };
    return (
        <div className={styles.ticketCard}>
            <div className={styles.ticketBody}>
                <h1 className={styles.ticketTitle}>{details?.title}</h1>
                <div className={styles.ticketContent}>
                    <p>{details?.address}</p>
                    <p className={`${status.toLocaleLowerCase()}`}>{statuses[status]}</p>
                    <div className={styles.wrapper}>
                        <ActionButton title='Детали' type='button' onClick={onClick}></ActionButton>
                        <ActionButton
                            title='Отменить'
                            type='button'
                            onClick={cancellBooking}
                        ></ActionButton>
                    </div>
                </div>
            </div>
            <div className={styles.ticketFooter}>
                <p>
                    {dateConverter.convertToLocaleString(
                        dateConverter.formattedDate(details?.dateTime),
                    )}
                </p>
            </div>
        </div>
    );
};

export const ArchivedTicketCard: React.FC<TicketProps> = ({ eventId, status }) => {
    const navigate = useNavigate();
    const [details, setDetails] = useState<IEvent>({
        id: '',
        images: [],
        title: '',
        description: '',
        dateTime: [],
        createTime: [],
        address: '',
        status: '',
    });
    const { token } = useAppSelector((state) => state.authReducer);
    const dateConverter: DateConverter = new DateConverter();
    const fetchDetails = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/event/${eventId}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchDetails();
        console.log(details);
    }, []);
    const onClick = async () => {
        navigate(`/item/${eventId}`);
    };
    return (
        <div className={styles.ticketCard}>
            <div className={styles.ticketBody}>
                <h1 className={styles.ticketTitle}>{details?.title}</h1>
                <div className={styles.ticketContent}>
                    <p>{details?.address}</p>
                    <p className={`${status.toLocaleLowerCase()}`}>{statuses[status]}</p>
                    <div className={styles.wrapper}>
                        {status == 'ARCHIVED' && (
                            <ActionButton
                                title='Оставить отзыв'
                                type='button'
                                onClick={onClick}
                            ></ActionButton>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.ticketFooter}>
                <p>
                    {dateConverter.convertToLocaleString(
                        dateConverter.formattedDate(details?.dateTime),
                    )}
                </p>
            </div>
        </div>
    );
};

export default TicketCard;
