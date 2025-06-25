import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import Form from '@components/Form';
import TextField from '@components/Field/TextField';
import defaultAvatar from '@assets/userAvatar.jpg';
import Button from '@components/Button';
import { useAppSelector } from '@hooks/useAppDispatch';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { clearSession } from '@store/User/AuthReducer';

interface ProfileProps {
    email: string;
    fullName: string;
    phoneNumber: string | number;
    image: string | null;
}

const ProfilePage = () => {
    const { token } = useAppSelector((state) => state.authReducer);
    const [profile, setProfile] = useState<ProfileProps>({
        email: '',
        fullName: '',
        phoneNumber: '',
        image: '',
    });
    const dispatch = useDispatch();
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
                        <Button title='Редактировать' type='button' />
                    </Form>
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
