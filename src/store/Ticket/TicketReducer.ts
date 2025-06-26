import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IEventCard } from "src/models/Event/Event";
import type { TicketProps } from "src/models/Ticket/Ticket";

interface TicketState {
    tickets: TicketProps[],
    isLoading: boolean;
}
interface Error {
    code: number | null;
}
const initialState: TicketState & Error = {
    tickets: [],
    isLoading: false,
    code: null
}

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action: PayloadAction<TicketProps[]>) => {
            state.tickets = action.payload;
            state.code = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }, 
        setErrorCode: (state, action: PayloadAction<number|null>) => {
            state.code = action.payload;
        },
        removeTicket: (state, action: PayloadAction<TicketProps>) => {
            state.tickets = state.tickets.filter(ticket => ticket.id != action.payload.id);
        }
    }
})

export default ticketSlice.reducer;
export const {setTickets, setLoading, setErrorCode, removeTicket} = ticketSlice.actions;