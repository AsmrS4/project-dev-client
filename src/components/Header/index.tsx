import Navbar from '@components/Navbar';
import AppLogo from '@components/Logotype';

const Header = () => {
    return (
        <>
            <header className='header'>
                <AppLogo />
                <Navbar isAuth={true} role='CLIENT' />
            </header>
        </>
    );
};

export default Header;
