import type { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { setProfile, setResponseCode } from "./ProfileReducer";
import { clearSession } from "./AuthReducer";


export const fetchProfile = (token: string | null) => async(dispatch:Dispatch)=> {
        try {
            const response = await axios({
                url: `${'http://localhost:8090/api'}/user/profile`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data)
            dispatch(
                setProfile({
                    email: response.data.email,
                    fullName: response.data.fullName,
                    image: response.data.image,
                    phoneNumber: response.data.phoneNumber,
                })
            )
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status == 401) {
                dispatch(clearSession());
                dispatch(setResponseCode(401))
            }
        }
    };