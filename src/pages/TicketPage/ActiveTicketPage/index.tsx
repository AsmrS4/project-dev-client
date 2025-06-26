import React, { useEffect, useState } from 'react';
import styles from '../TicketPage.module.scss';
import TicketCard from '@components/Card/Ticket';
import type { TicketProps } from 'src/models/Ticket/Ticket';
import { useAppSelector } from '@hooks/useAppDispatch';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
import { useNavigate } from 'react-router-dom';
import { LinkButton } from '@components/Button';
import { fetchTickets } from '@store/Ticket/TicketAction';

const ActiveTicketPage = () => {
    const { token } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const { tickets, code, isLoading } = useAppSelector((state) => state.ticketReducer);
    useEffect(() => {
        dispatch(fetchTickets(token));
    }, []);

    useEffect(() => {
        console.log(code);
        if (code == 401) {
            dispatch(clearSession());
            navigate('/auth/sign-in');
        }
    }, [code]);
    return (
        <section className={styles.ticketPage}>
            <div className={styles.pageHeader}>
                <h2>Активные билеты</h2>
                <LinkButton href='/history/tickets' title={'Архив'} type={'submit'}></LinkButton>
            </div>
            <div className={styles.ticketContainer}>
                {tickets.map((ticket) => {
                    return (
                        <TicketCard
                            key={ticket.id}
                            id={ticket.id}
                            eventId={ticket.eventId}
                            status={ticket.status}
                        ></TicketCard>
                    );
                })}
            </div>
        </section>
    );
};

export default ActiveTicketPage;
