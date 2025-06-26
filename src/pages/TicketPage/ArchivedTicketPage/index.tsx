import React, { useEffect, useState } from 'react';
import styles from '../TicketPage.module.scss';
import { LinkButton } from '@components/Button';
import type { TicketProps } from 'src/models/Ticket/Ticket';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArchivedTicketCard } from '@components/Card/Ticket';
import axios, { AxiosError } from 'axios';
import { clearSession } from '@store/User/AuthReducer';
const ArhivedTicketPage = () => {
    const [tickets, setTickets] = useState<TicketProps[]>([]);
    const { token } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const fetchVisited = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/history/tickets`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTickets(response.data);
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status == 401) {
                dispatch(clearSession());
                navigate('/auth/sign-in');
            }
        }
    };
    useEffect(() => {
        fetchVisited();
    }, []);
    return (
        <section className={styles.ticketPage}>
            <div className={styles.pageHeader}>
                <h2>Архив мероприятий</h2>
                <LinkButton href='/tickets' title={'Активные'} type={'submit'}></LinkButton>
            </div>
            <div className={styles.ticketContainer}>
                {tickets.map((ticket) => {
                    return (
                        <ArchivedTicketCard
                            key={ticket.id}
                            id={ticket.id}
                            eventId={ticket.eventId}
                            status={ticket.status}
                        ></ArchivedTicketCard>
                    );
                })}
            </div>
        </section>
    );
};

export default ArhivedTicketPage;
