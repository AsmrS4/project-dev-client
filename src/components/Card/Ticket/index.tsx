import React, { useEffect, useState } from 'react';
import styles from './Ticket.module.scss';
import { ActionButton } from '@components/Button';
import { useNavigate } from 'react-router-dom';
import { DateConverter } from '@utils/converter/DateConverter';
import type { TicketProps } from 'src/models/Ticket/Ticket';
import type { IEvent } from 'src/models/Event/Event';
import axios from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';

const TicketCard: React.FC<TicketProps> = ({ eventId, status }) => {
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
                    <p>{details?.status}</p>
                    <ActionButton
                        title='Перейти на страницу'
                        type='button'
                        onClick={onClick}
                    ></ActionButton>
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
