import React, { useEffect } from 'react';
import style from './Navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@store/User/AuthActionCreators';
import { useAppSelector } from '@hooks/useAppDispatch';
import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth, role } = useAppSelector((state) => state.authReducer);
    const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutUser());
        navigate('/auth/sign-in');
    };
    useEffect(() => {}, [role, isAuth]);
    return (
        <nav className={style.navBar}>
            <ul className={style.navBar__list}>
                {isAuth && (
                    <>
                        <li className={style.navBar__listItem}>
                            <Link to={'/'}>{'Главная'}</Link>
                        </li>
                        {role == 'CLIENT' && (
                            <li className={style.navBar__listItem}>
                                <Link to={'/tickets'}>{'Билеты'}</Link>
                            </li>
                        )}
                        {role == 'MANAGER' && (
                            <li className={style.navBar__listItem}>
                                <Link to='/archive'>{'Арихив мероприятий'}</Link>
                            </li>
                        )}
                        {role == 'CLIENT' && (
                            <li className={style.navBar__listItem}>
                                <Link to='/profile'>{'Профиль'}</Link>
                            </li>
                        )}
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
                            <Link to='/auth/sign-up'>{'Регистрация'}</Link>
                        </li>
                        <li className={style.navBar__listItem}>
                            <Link to='/auth/sign-in'>{'Вход'}</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
