import Navbar from '@components/Navbar';
import AppLogo from '@components/Logotype';

const Header = () => {
    return (
        <>
            <section className='header'>
                <AppLogo />
                <Navbar isAuth={true} role='CLIENT' />
            </section>
        </>
    );
};

export default Header;
