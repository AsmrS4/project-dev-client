import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthPayload {
    isAuth: boolean,
    role: string,
    token: string
}

interface AuthState {
    isAuth: boolean,
    role: string | null;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuth: !!localStorage.getItem("ACCESS_TOKEN"),
    role: localStorage.getItem("ROLE"),
    token: localStorage.getItem("ACCESS_TOKEN"),
    error: null
}

const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<AuthPayload>) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isAuth = true;
            localStorage.setItem("ACCESS_TOKEN", action.payload.token);
            localStorage.setItem("ROLE", action.payload.role);
            state.error = null;
            
        },
        clearSession: (state) => {
            state.isAuth = false;
            state.token = null;
            state.role = null;
            localStorage.removeItem("ACCESS_TOKEN")
            localStorage.removeItem("ROLE")
            state.error = null;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        }
    }
})


export const { setSession, clearSession, setErrorMessage } = authSlice.actions
export default authSlice.reducer;