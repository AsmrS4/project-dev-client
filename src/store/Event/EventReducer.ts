import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IEventCard } from "src/models/Event/Event";
import type { LoadingProps, ResponseCode } from "src/models/Status/Status";

interface EventState extends LoadingProps,ResponseCode {
    events: IEventCard[],
}

const initialState: EventState = {
    events: [],
    isLoading: false,
    code: null
}

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<EventState>) => {
            state.isLoading = action.payload.isLoading
            state.events = action.payload.events;
            state.code = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }, 
        setErrorCode: (state, action: PayloadAction<number|null>) => {
            state.code = action.payload;
        }
    }
})

export default eventSlice.reducer;
export const {setEvents, setLoading, setErrorCode} = eventSlice.actions;