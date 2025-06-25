import Login from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';
import ProfilePage from '@pages/Profile';
import HomePage from '@pages/HomePage';
import Header from '@components/Header';
import EventPage from '@pages/Event';
import ActiveTicketPage from '@pages/TicketPage/ActiveTicketPage';
import ArhivedTicketPage from '@pages/TicketPage/ArchivedTicketPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route element={<PrivateRouter />}>
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/item/:id' element={<EventPage />} />
                        <Route path='/tickets' element={<ActiveTicketPage />} />
                        <Route path='/history/tickets' element={<ArhivedTicketPage />} />
                    </Route>

                    <Route path='/auth'>
                        <Route path='/auth/sign-in' element={<Login />} />
                        <Route path='/auth/sign-up' element={<SignUp />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
