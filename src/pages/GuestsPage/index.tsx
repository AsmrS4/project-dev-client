import React, { useEffect, useState } from 'react';
import './GuestPage.scss';
import GuestsList from '@components/Guests';
import type { IGuestCard } from 'src/models/Guest';
import { useAppSelector } from '@hooks/useAppDispatch';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
import Field from '@components/Field/Input';
const GuestsPage = () => {
    const { id } = useParams();
    const [guests, setGuest] = useState<IGuestCard[]>([]);
    const { token, role } = useAppSelector((state) => state.authReducer);
    const [searchText, setSearchText] = useState<string>('');
    const [filteredGuests, setFilteredGuests] = useState(guests);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
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
    useEffect(() => {
        setFilteredGuests(
            searchText.trim() != ''
                ? guests.filter((guets) =>
                      guets.fullName.toLowerCase().includes(searchText.toLowerCase()),
                  )
                : guests,
        );
        console.log('filtered');
    }, [searchText, guests]);
    return (
        <section className='guestsPage'>
            <div className='pageHeader'>
                <h1>Список гостей</h1>
                <Field
                    placeholder='Поиск по названию'
                    value={searchText}
                    onChange={handleSearchText}
                />
            </div>
            <GuestsList guests={filteredGuests} />
        </section>
    );
};

export default GuestsPage;
