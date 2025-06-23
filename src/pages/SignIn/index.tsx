import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Form from '@components/Form';
import Field from '@components/Field/Input';
import Message from '@components/Message';
import { useInput } from '@hooks/useInput';
import { useAppSelector } from '@hooks/useAppDispatch';
import { authorizeUser } from '@store/User/AuthActionCreators';

import { emailInit, passwordInit } from './index.config';
import styles from './Login.module.scss';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hasError, setError] = useState<boolean>(false);
    const { isAuth, error } = useAppSelector((state) => state.authReducer);

    const email: any = useInput(emailInit);
    const password: any = useInput(passwordInit);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);
        if (email.isEmpty || password.isEmpty) {
            setError(true);
            return setErrorMessage('Заполните все поля!');
        }
        if (email.emailError) {
            setError(true);
            return setErrorMessage('Некорректный формат email');
        }
        if (password.minLengthError) {
            setError(true);
            return setErrorMessage('Длина пароля должна быть больше 8 символов');
        }
        if (password.passwordError) {
            setError(true);
            return setErrorMessage('Пароль должен содержать хотя бы 1 цифру');
        }
        setError(false);
        dispatch(
            authorizeUser({
                email: email.value,
                password: password.value,
            }),
        );
    };

    useEffect(() => {
        if (error) {
            setError(true);
            return setErrorMessage(error);
        }
    }, [error]);

    return (
        <section className={styles.loginPage}>
            <Form title='Авторизация' onSubmit={handleForm}>
                <Field {...email} />
                <Field {...password} />
                <a href='/auth/sign-up'>Создать аккаунт</a>
            </Form>
            <Message message={errorMessage} visible={hasError} type='error' />
        </section>
    );
};

export default Login;
