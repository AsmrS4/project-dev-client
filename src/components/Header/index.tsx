import Navbar from '@components/Navbar';
import AppLogo from '@components/Logotype';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
const Header: React.FC = () => {
    const [url, setUrl] = useState<string>(window.location.pathname);
    const [role, setRole] = useState<string | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem('ACCESS_TOKEN') && localStorage.getItem('ROLE')) {
            setIsAuth(true);
            setRole(localStorage.getItem('ROLE'));
        }
    }, [isAuth, role, url]);

    return (
        <>
            <header className='header'>
                <AppLogo />
                <Navbar />
            </header>
        </>
    );
};

export default Header;
