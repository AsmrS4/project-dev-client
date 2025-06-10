import React, { useState } from 'react';

import Form from '@components/Form';
import Field from '@components/Field/Input';
import styles from './Login.module.scss';
import { useInput } from '@hooks/useInput';
import Message from '@components/Message';
import { emailInit, passwordInit } from './index.config';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const email: any = useInput(emailInit);
    const password: any = useInput(passwordInit);

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
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
    };

    return (
        <section className={styles.loginPage}>
            <Form title='Авторизация' onSubmit={handleForm}>
                <Field {...email} />
                <Field {...password} />
                <a href='/auth/sign-up'>Создать аккаунт</a>
            </Form>
            <Message message={errorMessage} visible={error} type='error' />
        </section>
    );
};

export default Login;
