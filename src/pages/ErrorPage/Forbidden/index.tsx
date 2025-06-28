import React, { useEffect, useState } from 'react';
import styles from '../ErrorPage.module.scss';
import image from '@assets/sad.svg';

import { LinkButton } from '@components/Button';

const ForbiddenError = () => {
    return (
        <section className={styles.errorPage}>
            <div className={styles.errorContainer}>
                <div className=''>
                    <img className={styles.errorImg} src={image} alt='403 image' />
                    <span className={styles.errorTitle}>
                        {' Доступ запрещен.\nУ вас недостаточно прав для доступа к этому ресурсу'}
                    </span>
                </div>
                <LinkButton title={'Вернуться на Главную'} href={'/'} type='button'></LinkButton>
            </div>
        </section>
    );
};

export default ForbiddenError;
