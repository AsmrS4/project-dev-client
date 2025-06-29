import { useEffect } from 'react';
import styles from './HistoryPage.module.scss';
import Filter from '@components/Filter';
import EventCard from '@components/Card/Event';
import { useAppSelector } from '@hooks/useAppDispatch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSession } from '@store/User/AuthReducer';
import EmptyAnswer from '@components/Message/Answer';
import { fetchHistoryEvents } from '@store/Event/History/HistoryEventActionCreator';

const HistoryPage = () => {
    const { events, isLoading, code } = useAppSelector((state) => state.eventReducer);
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        !isAuth ? navigate('/auth/sign-in') : dispatch(fetchHistoryEvents());
    }, [isAuth]);
    useEffect(() => {
        if (code != null) {
            switch (code) {
                case 401: {
                    dispatch(clearSession());
                    navigate('/auth/sign-in');
                    break;
                }
                case 403: {
                    navigate('/error/forbidden');
                    break;
                }
                default: {
                    navigate('/error/server');
                }
            }
        }
    });
    return (
        <section className={styles.homePage}>
            <div className={styles.eventContainer}>
                {events && events.length > 0 ? (
                    events.map((event) => {
                        return <EventCard key={event.id} {...event} />;
                    })
                ) : (
                    <>
                        <EmptyAnswer message={'Архив пуст'}></EmptyAnswer>
                    </>
                )}
            </div>
        </section>
    );
};

export default HistoryPage;
