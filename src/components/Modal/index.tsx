import React, { useEffect, useState } from 'react';
import styles from './ModalComponent.module.scss';
import { Button, Modal } from 'antd';
import { EditForm } from '@components/Form';
import Field from '@components/Field/Input';
import { useInput } from '@hooks/useInput';
import { emailInit, phoneInit, userNameInit } from '@pages/SignUp/index.config';
import type { ProfileProps } from 'src/models/Auth/Auth';
import Message from '@components/Message';

interface ModalProps {
    title: string;
    initialState: boolean;
    initialDetails: ProfileProps;
    onClick: () => void;
    children?: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({
    title,
    initialState,
    onClick,
    initialDetails,
    children,
}) => {
    const [state, setState] = useState<boolean>(initialState);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hasError, setError] = useState<boolean>(false);
    const email: any = useInput(emailInit);
    const userName: any = useInput(userNameInit);
    const phoneNumber: any = useInput(phoneInit);
    const handleOk = () => {
        handleForm();
    };
    const handleCancel = () => {
        setError(false);
        onClick();
    };
    useEffect(() => {}, []);
    useEffect(() => {
        setState(initialState);
        userName.setValue(initialDetails.fullName);
        email.setValue(initialDetails.email);
        phoneNumber.setValue(initialDetails.phoneNumber);
    }, [initialState]);

    const handleForm = async () => {
        setError(false);
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
                    <Message message={errorMessage} type='error' visible={hasError} />
                </EditForm>
            </Modal>
        </>
    );
};

export default ModalComponent;
