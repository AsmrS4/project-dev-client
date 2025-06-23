import React, { useEffect } from 'react';
import style from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@store/User/AuthActionCreators';
import { useAppSelector } from '@hooks/useAppDispatch';

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const { isAuth, role } = useAppSelector((state) => state.authReducer);
    const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutUser());
    };
    useEffect(() => {}, [role, isAuth]);
    return (
        <nav className={style.navBar}>
            <ul className={style.navBar__list}>
                <li className={style.navBar__listItem}>
                    <a href='/'>{'Главная'}</a>
                </li>
                {isAuth && (
                    <>
                        {role == 'CLIENT' && (
                            <li className={style.navBar__listItem}>
                                <a href='/tickets'>{'Билеты'}</a>
                            </li>
                        )}
                        {role == 'MANAGER' && (
                            <li className={style.navBar__listItem}>
                                <a href='/archive'>{'Арихив мероприятий'}</a>
                            </li>
                        )}
                        <li className={style.navBar__listItem}>
                            <a href='/profile'>{'Профиль'}</a>
                        </li>
                    </>
                )}
            </ul>
            <ul className={style.navBar__list}>
                {isAuth ? (
                    <li className={style.navBar__listItem}>
                        <a
                            onClick={(e) => {
                                logout(e);
                            }}
                        >
                            {'Выйти'}
                        </a>
                    </li>
                ) : (
                    <>
                        <li className={style.navBar__listItem}>
                            <a href='/auth/sign-up'>{'Регистрация'}</a>
                        </li>
                        <li className={style.navBar__listItem}>
                            <a href='/auth/sign-in'>{'Вход'}</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
