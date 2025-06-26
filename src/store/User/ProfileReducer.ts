import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfileProps } from "src/models/Auth/Auth";
import type { LoadingProps, ResponseCode } from "src/models/Status/Status";


interface ProfilePayload extends ResponseCode, LoadingProps{
    profile: ProfileProps;
}

const initialState: ProfilePayload = {
    profile: {
        email: '',
        fullName: '',
        phoneNumber: '',
        image: null,
    },
    isLoading: false,
    code: null
}

const profileSlice = createSlice( {
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileProps>) => {
            state.profile = action.payload
            state.code = null;
            
        },
        setResponseCode: (state, action: PayloadAction<number>) => {
            state.code = action.payload
        }
    }
})


export const { setProfile, setResponseCode} = profileSlice.actions
export default profileSlice.reducer;