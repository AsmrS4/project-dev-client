import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouter: React.FunctionComponent = () => {
    const isAuth: boolean = localStorage.getItem('ACCESS_TOKEN') ? true : false;
    return isAuth ? <Outlet /> : <Navigate to='/auth/sign-in' />;
};

export default PrivateRouter;
