import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import Form, { EditForm } from '@components/Form';
import TextField from '@components/Field/TextField';
import defaultAvatar from '@assets/userAvatar.jpg';
import Button, { ActionButton } from '@components/Button';
import { useAppSelector } from '@hooks/useAppDispatch';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';
import ModalComponent from '@components/Modal';
import type { ProfileProps } from 'src/models/Auth/Auth';
import Message from '@components/Message';

const ProfilePage = () => {
    const { token } = useAppSelector((state) => state.authReducer);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [profile, setProfile] = useState<ProfileProps>({
        email: '',
        fullName: '',
        phoneNumber: '',
        image: '',
    });
    const dispatch = useDispatch();
    const handleModal = () => {
        console.log('clicked');
        setIsOpen((prev) => !prev);
    };

    const fetchProfile = async () => {
        try {
            const response = await axios({
                url: `${'http://localhost:8090/api'}/user/profile`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile({
                email: response.data.email,
                fullName: response.data.fullName,
                image: response.data.image,
                phoneNumber: response.data.phoneNumber,
            });
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status == 401) {
                dispatch(clearSession());
            }
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    useEffect(() => {}, [profile]);
    const email = {
        label: 'Email',
        type: 'text',
        value: profile.email,
    };
    const phone = {
        label: 'Номер телефона',
        type: 'text',
        value: profile.phoneNumber,
    };
    return (
        <>
            <section className={styles.profilePage}>
                <div className={styles.profileContent}>
                    <div className={styles.imgWrapper}>
                        <img
                            src={defaultAvatar}
                            className={styles.profilePhoto}
                            alt='profile photo'
                        />
                    </div>
                    <Form title={profile.fullName} onSubmit={() => {}} readonly={true}>
                        <TextField {...email} />
                        <TextField {...phone} />
                        <ActionButton title='Редактировать' type='button' onClick={handleModal} />
                    </Form>
                </div>
                <ModalComponent
                    title='Редактирование'
                    initialState={isOpen}
                    initialDetails={profile}
                    onClick={handleModal}
                ></ModalComponent>
            </section>
        </>
    );
};

export default ProfilePage;
