import React, { useEffect, useState } from 'react';
import styles from '../Page.module.scss';
import { EventForm } from '@components/Form';
import Field from '@components/Field/Input';
import Message from '@components/Message';
import DatePickerComp from '@components/DatePicker';
import TextAreaComp from '@components/Field/TextArea';
import ImageUploader from '@components/ImageUploader';
import Button, { ActionButton } from '@components/Button';
import moment, { type Moment } from 'moment';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
import { useNavigate } from 'react-router-dom';
import type { EventCreate } from 'src/models/Event/Event';

interface ImageType {
    imageUrl: string;
}
const CreateEventPage = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hasError, setError] = useState<boolean>(false);

    const [title, setTitle] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [dateTime, setDateTime] = useState<Moment | undefined>();
    const [address, setAddress] = useState<string | undefined>();
    const [imageUrls, setImageUrls] = useState<ImageType[]>([]);

    const { token, role } = useAppSelector((state) => state.authReducer);

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };
    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };
    const handleDate = (date: moment.Moment | undefined) => {
        setDateTime(date);
    };
    const handleSubmit = async () => {
        setError(false);
        if (!title || title === '') {
            setError(true);
            setErrorMessage('Название обязательно к заполнению');
            return;
        }
        if (!description || description === '') {
            setError(true);
            setErrorMessage('Описание обязательно к заполнению');
            return;
        }
        if (!address || address === '') {
            setError(true);
            setErrorMessage('Место проведения обязательно к заполнению');
            return;
        }
        if (!dateTime) {
            setError(true);
            setErrorMessage('Дата обязательна к заполнению');
            return;
        }
        if (imageUrls.length == 0 || imageUrls[0]['imageUrl'].trim() === '') {
            setError(true);
            setErrorMessage('Укажите хотя бы 1 изображение');
            return;
        } else {
            createNewEvent({
                title: title,
                description: description,
                address: address,
                dateTime: dateTime.format('YYYY-MM-DDTHH:mm:ss'),
                images: imageUrls,
            });
            setError(false);
            console.log(title);
            console.log(description);
            console.log(address);
            console.log(dateTime.format('YYYY-MM-DDTHH:mm:ss'));
            console.log(imageUrls);
        }
    };

    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const createNewEvent = async (data: EventCreate) => {
        try {
            const response = await axios({
                url: `${'http://localhost:8090/api'}/event`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    ...data,
                },
            });
            navigate(`/item/${response.data}`);
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                switch (error.response.status) {
                    case 400: {
                        setError(true);
                        setErrorMessage('Некорректные данные');
                        break;
                    }
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
        if (role !== 'MANAGER') {
            navigate('/error/forbidden');
        }
    }, []);

    return (
        <section className={styles.eventPage}>
            <div className={styles.eventHeader}>
                <h1>Создание мероприятия</h1>
            </div>
            <EventForm>
                <Field label={'Название'} value={title} onChange={handleTitle} />
                <TextAreaComp label={'Описание'} value={description} onChange={handleDesc} />
                <Field label={'Место проведения'} value={address} onChange={handleAddress} />
                <DatePickerComp label={'Дата проведения'} value={dateTime} onChange={handleDate} />
                <ImageUploader imageUrls={imageUrls} setImageUrls={setImageUrls} />
            </EventForm>
            <Message message={errorMessage} type={'error'} visible={hasError} />
            <ActionButton title={'Создать'} type={'submit'} onClick={handleSubmit} />
        </section>
    );
};

export default CreateEventPage;
