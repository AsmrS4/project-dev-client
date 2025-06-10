import React from 'react';
import style from './Navbar.module.scss';

interface NavbarProps {
    isAuth: boolean;
    role: 'CLIENT' | 'MANAGER' | 'SECURITY';
}

const Navbar: React.FC<NavbarProps> = ({ isAuth = false, role = 'CLIENT' }) => {
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
                        <a href='/'>{'Выйти'}</a>
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
