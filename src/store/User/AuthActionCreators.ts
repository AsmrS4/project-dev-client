import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import type { ILogin } from "src/models/Auth/Auth";
import { clearSession, setErrorMessage, setSession } from "./AuthReducer";
import type { Dispatch } from "@reduxjs/toolkit";


export const authorizeUser = (payload: ILogin) => async (dispatch: Dispatch) => {
    try {
            const response = await axios({
                url: `${"http://localhost:8090/api"}/auth/sign-in`,
                method: 'POST',
                data: {
                    ...payload,
                },
            });
            const JWT = response.data.accessToken;
            const { role } = jwtDecode(JWT);
            
            dispatch(setSession({
                isAuth: true,
                role: role[0],
                token: JWT
            }))
            
        } catch (error) {
            dispatch(setErrorMessage("Неверный логин или пароль"))
        }
}

export const logoutUser = () => async(dispatch: Dispatch) => {
    try {
        await axios({
            url:`${"http://localhost:8090/api"}/auth/sign-in`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
            }
        })
        localStorage.clear();
        dispatch(await clearSession());
    } catch(error: unknown) {
        if(error instanceof AxiosError && error.response) {
            localStorage.clear();
            dispatch(await clearSession());
        }
    } 
}