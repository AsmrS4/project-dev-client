import React, { useEffect, useState } from 'react';
import styles from '../ErrorPage.module.scss';
import died from '@assets/died.svg';
import blowing from '@assets/blowing.svg';
import crying from '@assets/crying.svg';
import { LinkButton } from '@components/Button';

const ErrorServer = () => {
    const images: string[] = [died, blowing, crying];
    const [image, setImage] = useState<string | undefined>();
    useEffect(() => {
        const index: number = randomIndex(0, images.length);
        setImage(images[index]);
    }, []);
    return (
        <section className={styles.errorPage}>
            <div className={styles.errorContainer}>
                <div className=''>
                    <img className={styles.errorImg} src={image} alt='500 image' />
                    <span className={styles.errorTitle}>Ошибка сервера</span>
                </div>
                <LinkButton title={'Вернуться на Главную'} href={'/'} type='button'></LinkButton>
            </div>
        </section>
    );
};

function randomIndex(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export default ErrorServer;
