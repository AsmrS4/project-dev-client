import React, { useEffect, useState } from 'react';
import styles from './ModalComponent.module.scss';
import { Button, Modal } from 'antd';
import { EditForm } from '@components/Form';
import Field from '@components/Field/Input';
import { useInput } from '@hooks/useInput';
import { emailInit, phoneInit, userNameInit } from '@pages/SignUp/index.config';
import type { ProfileProps } from 'src/models/Auth/Auth';
import Message from '@components/Message';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { setProfile } from '@store/User/ProfileReducer';

interface ModalProps {
    title: string;
    initialState: boolean;
    initialDetails: ProfileProps;
    onClick: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ title, initialState, onClick, initialDetails }) => {
    const [state, setState] = useState<boolean>(initialState);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hasError, setError] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { token } = useAppSelector((state) => state.authReducer);
    const email: any = useInput(emailInit);
    const userName: any = useInput(userNameInit);
    const phoneNumber: any = useInput(phoneInit);
    const dispatch: any = useDispatch();
    const handleOk = () => {
        handleForm();
    };
    const handleCancel = () => {
        onClick();
        setError(false);
        setIsSuccess(false);
    };
    useEffect(() => {}, []);
    useEffect(() => {
        setState(initialState);
        userName.setValue(initialDetails.fullName);
        email.setValue(initialDetails.email);
        phoneNumber.setValue(initialDetails.phoneNumber);
    }, [initialState]);
    const editProfile = async () => {
        try {
            await axios({
                url: `${'http://localhost:8090/api'}/user/profile`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    email: email.value,
                    fullName: userName.value,
                    phoneNumber: phoneNumber.value,
                    image: null,
                },
            });
            setIsSuccess(true);
            dispatch(
                setProfile({
                    email: email.value,
                    fullName: userName.value,
                    phoneNumber: phoneNumber.value,
                    image: null,
                }),
            );
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status == 400) {
                setError(true);
                setErrorMessage(error.response.data['error: ']);
            }
        }
    };
    const handleForm = async () => {
        setError(false);
        setIsSuccess(false);
        if (email.isEmpty || userName.isEmpty || phoneNumber.value == null) {
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
        setError(false);
        editProfile();
    };

    return (
        <>
            <Modal
                title={title}
                closable={{ 'aria-label': 'Custom Close Button' }}
                className=''
                open={state}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={'Изменить'}
                cancelText={'Отмена'}
            >
                <EditForm>
                    <Field {...userName} />
                    <Field {...phoneNumber} />
                    <Field {...email} />
                    <Message
                        message={hasError ? errorMessage : 'Данные успешно обновлены'}
                        type={hasError ? 'error' : 'success'}
                        visible={hasError || isSuccess}
                    />
                </EditForm>
            </Modal>
        </>
    );
};

export default ModalComponent;
