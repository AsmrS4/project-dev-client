import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './User/AuthReducer'
import eventSlice from './Event/EventReducer'
import ticketSlice from './Ticket/TicketReducer'
import profileSlice from './User/ProfileReducer'
import historySlice from './Event/History/HistoryEventReducer'

const rootReducer = combineReducers({
    authReducer: authSlice,
    eventReducer: eventSlice,
    historyReducer: historySlice,
    ticketReducer: ticketSlice,
    profileReducer: profileSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']