import type { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { removeTicket, setErrorCode, setTickets } from "./TicketReducer";
import { clearSession } from "@store/User/AuthReducer";
import type { TicketProps } from "src/models/Ticket/Ticket";

export const fetchTickets = (token: string | null) => async(dispatch: Dispatch)=> {
        try {
            const response = await axios({
                url: `http://localhost:8090/api/booking/tickets`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch( setTickets(response.data));
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.status == 401) {
                dispatch(setErrorCode(401))
                dispatch(clearSession());
            }
        }
    };

export const removeCancelledTicket = (ticket: TicketProps) => async(dispatch: Dispatch) => {
    dispatch(removeTicket(ticket));
}