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
import NotFound from '@pages/ErrorPage/NotFound';
import ErrorServer from '@pages/ErrorPage/ServerError';
import ForbiddenError from '@pages/ErrorPage/Forbidden';
import ArchivedEventPage from '@pages/ArchivedEvent';
import HistoryPage from '@pages/History/HistoryPage';
import CreateEventPage from '@pages/ModifyEvent/CreateEventPage';
import EditEventPage from '@pages/ModifyEvent/EditEventPage';

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
                    <Route path='/history'>
                        <Route path='/history/event' element={<HistoryPage />} />
                        <Route path='/history/event/:id' element={<ArchivedEventPage />} />
                    </Route>
                    <Route path='/create/event' element={<CreateEventPage />} />
                    <Route path='/edit/event/:id' element={<EditEventPage />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='/error/server' element={<ErrorServer />} />
                    <Route path='/error/forbidden' element={<ForbiddenError />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
