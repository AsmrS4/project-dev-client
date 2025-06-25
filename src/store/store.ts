import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './User/AuthReducer'
import eventSlice from './Event/EventReducer'
const rootReducer = combineReducers({
    authReducer: authSlice,
    eventReducer: eventSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']