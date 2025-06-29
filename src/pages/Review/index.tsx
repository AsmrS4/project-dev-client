import React, { useEffect, useState } from 'react';
import styles from './Review.module.scss';
import { EventForm } from '@components/Form';
import Message from '@components/Message';
import TextAreaComp from '@components/Field/TextArea';
import { ActionButton } from '@components/Button';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

interface ReviewCreate {
    content: string;
    rating: number;
}

const CreateReviewPage = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hasError, setError] = useState<boolean>(false);
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState<string | undefined>();

    const { token, role } = useAppSelector((state) => state.authReducer);

    const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        setError(false);
        if (!rating || rating === 0) {
            setError(true);
            setErrorMessage('Поставьте оценку');
            return;
        }
        if (!description || description === '') {
            setError(true);
            setErrorMessage('Комментарий обязателен к заполнению');
            return;
        } else {
            createReview({
                content: description,
                rating: rating,
            });
            setError(false);
        }
    };

    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const createReview = async (data: ReviewCreate) => {
        try {
            await axios({
                url: `http://localhost:8090/api/history/tickets/${id}/review`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    ...data,
                },
            });
            navigate(`/history/event/${id}`);
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
        if (role !== 'CLIENT') {
            navigate('/error/forbidden');
        }
    }, []);

    return (
        <section className={styles.eventPage}>
            <div className={styles.eventHeader}>
                <h1>Рецензия</h1>
            </div>
            <Message message={errorMessage} type={'error'} visible={hasError} />
            <EventForm>
                <div className={styles.ratingWrapper}>
                    <label>Оценка:</label>
                    <Rate allowClear={true} onChange={setRating} value={rating} />
                </div>
                <TextAreaComp label={'Комментарий:'} value={description} onChange={handleDesc} />
            </EventForm>
            <div className={styles.wrapper}>
                <ActionButton
                    title={'Назад'}
                    type={'submit'}
                    onClick={() => {
                        navigate(-1);
                    }}
                />
                <ActionButton title={'Отправить'} type={'submit'} onClick={handleSubmit} />
            </div>
        </section>
    );
};

export default CreateReviewPage;

const customIcons: Record<number, React.ReactNode> = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
};
