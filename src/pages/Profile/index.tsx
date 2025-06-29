import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@hooks/useAppDispatch';
import ModalComponent from '@components/Modal';
import Form from '@components/Form';
import { ActionButton } from '@components/Button';
import TextField from '@components/Field/TextField';
import { fetchProfile } from '@store/User/ProfileAction';
import { clearSession } from '@store/User/AuthReducer';

import defaultAvatar from '@assets/userAvatar.jpg';
import styles from './Profile.module.scss';

const ProfilePage = () => {
    const { token } = useAppSelector((state) => state.authReducer);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { profile, code } = useAppSelector((state) => state.profileReducer);
    const dispatch: any = useDispatch();
    const navigate: any = useNavigate();
    const handleModal = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        dispatch(fetchProfile(token));
    }, []);

    useEffect(() => {
        console.log(code);
        if (code == 401) {
            dispatch(clearSession());
            navigate('/auth/sign-in');
        }
    }, [code]);
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
                        {profile.phoneNumber != null && <TextField {...phone} />}
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
