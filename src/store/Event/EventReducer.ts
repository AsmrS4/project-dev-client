import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IEventCard } from "src/models/Event/Event";

interface EventState {
    events: IEventCard[],
    isLoading: boolean;
}
interface Error {
    code: number | null;
}
const initialState: EventState & Error = {
    events: [],
    isLoading: false,
    code: null
}

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<EventState>) => {
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