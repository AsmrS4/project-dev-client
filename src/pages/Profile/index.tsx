import React from 'react';
import styles from './Profile.module.scss';
import Form from '@components/Form';
import TextField from '@components/Field/TextField';
import defaultAvatar from '@assets/userAvatar.jpg';
import Button from '@components/Button';
import Header from '@components/Header';
const ProfilePage = () => {
    const email = {
        label: 'Email',
        type: 'text',
        value: 'example.com',
    };
    const phone = {
        label: 'Номер телефона',
        type: 'text',
        value: '+7 800 555 3535',
    };
    return (
        <>
            <Header />
            <section className={styles.profilePage}>
                <div className={styles.profileContent}>
                    <div className={styles.imgWrapper}>
                        <img
                            src={defaultAvatar}
                            className={styles.profilePhoto}
                            alt='profile photo'
                        />
                    </div>
                    <Form title='Имя пользователя' onSubmit={() => {}} readonly={true}>
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
