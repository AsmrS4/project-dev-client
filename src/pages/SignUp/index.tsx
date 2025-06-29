import React, { useState } from 'react';
import styles from './Register.module.scss';
import Form from '@components/Form';
import Field from '@components/Field/Input';
import Message from '@components/Message';
import { emailInit, passwordInit, phoneInit, userNameInit } from './index.config';
import { useInput } from '@hooks/useInput';

import type { IRegister } from 'src/models/Auth/Auth';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { authorizeUser } from '@store/User/AuthActionCreators';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hasError, setError] = useState<boolean>(false);

    const email: any = useInput(emailInit);
    const userName: any = useInput(userNameInit);
    const phoneNumber: any = useInput(phoneInit);
    const password: any = useInput(passwordInit);

    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const registerUser = async (payload: IRegister) => {
        try {
            await axios({
                url: `${'http://localhost:8090/api'}/auth/sign-up`,
                method: 'POST',
                data: {
                    ...payload,
                },
            });
            dispatch(
                authorizeUser({
                    email: email.value,
                    password: password.value,
                }),
            );
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status === 400) {
                setError(true);
                setErrorMessage(error.response.data['error: ']);
            }
        }
    };

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);
        if (email.isEmpty || userName.isEmpty || password.isEmpty || phoneNumber.value == null) {
            setError(true);
            return setErrorMessage('Заполните поля');
        }
        if (!phoneNumber.isEmpty && phoneNumber.phoneError) {
            setError(true);
            return setErrorMessage('Некорректный формат номера');
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
        console.log(
            await registerUser({
                email: email.value,
                password: password.value,
                phoneNumber: phoneNumber.value,
                fullName: userName.value,
            }),
        );
    };

    return (
        <section className={styles.registerPage}>
            <Form title={'Регистрация'} onSubmit={handleForm}>
                <Field {...userName} />
                <div className='row'>
                    <Field {...phoneNumber} />
                    <Field {...email} />
                </div>
                <Field {...password} />
                <a href='/auth/sign-in'>Войти в систему</a>
            </Form>
            <Message message={errorMessage} type='error' visible={hasError} />
        </section>
    );
};

export default SignUp;
