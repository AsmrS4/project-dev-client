import styles from '../ErrorPage.module.scss';
import img from '@assets/sad.svg';
import { LinkButton } from '@components/Button';

const NotFound = () => {
    return (
        <section className={styles.errorPage}>
            <div className={styles.errorContainer}>
                <div className=''>
                    <img className={styles.errorImg} src={img} alt='404 image' />
                    <span className={styles.errorTitle}>Ничего не найдено</span>
                </div>
                <LinkButton title={'Вернуться на Главную'} href={'/'} type='button'></LinkButton>
            </div>
        </section>
    );
};

export default NotFound;
