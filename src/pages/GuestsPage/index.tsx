import React, { useEffect, useState } from 'react';
import './GuestPage.scss';
import GuestsList from '@components/Guests';
import type { IGuestCard } from 'src/models/Guest';
import { useAppSelector } from '@hooks/useAppDispatch';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
const GuestsPage = () => {
    const { id } = useParams();
    const [guests, setGuest] = useState<IGuestCard[]>([]);
    const { token, role } = useAppSelector((state) => state.authReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchGuests = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/event/${id}/guests`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setGuest(response.data);
            console.log(response.data);
        } catch (error) {
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
        fetchGuests();
    }, []);
    return (
        <section className='guestsPage'>
            <div className='pageHeader'>
                <h1>Список гостей</h1>
            </div>
            <GuestsList guests={guests} />
        </section>
    );
};

export default GuestsPage;
