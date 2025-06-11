import Navbar from '@components/Navbar';
import AppLogo from '@components/Logotype';
import React, { useState } from 'react';
const Header: React.FC = () => {
    const [url, setUrl] = useState<string>(window.location.pathname);

    return (
        <>
            {!url.includes('auth') && (
                <header className='header'>
                    <AppLogo />
                    <Navbar isAuth={true} role='CLIENT' />
                </header>
            )}
        </>
    );
};

export default Header;
