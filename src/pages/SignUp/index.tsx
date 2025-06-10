import React, { useState } from 'react';
import styles from './Register.module.scss';
import Form from '@components/Form';
import Field from '@components/Field';
import Message from '@components/Message';
import { emailInit, passwordInit, phoneInit, userNameInit } from './index.config';
import { useInput } from '@hooks/useInput';

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const email: any = useInput(emailInit);
    const userName: any = useInput(userNameInit);
    const phoneNumber: any = useInput(phoneInit);
    const password: any = useInput(passwordInit);

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(false);
        if (email.isEmpty || userName.isEmpty || password.isEmpty) {
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
    };

    return (
        <section className={styles.registerPage}>
            <Form title={'Регистрация'} onSubmit={handleForm}>
                <Field {...userName} />
                <Field {...phoneNumber} />
                <Field {...email} />
                <Field {...password} />
                <a href='/auth/sign-in'>Войти в систему</a>
            </Form>
            <Message message={errorMessage} type='error' visible={error} />
        </section>
    );
};

export default SignUp;
