import axios, { AxiosError } from "axios"
import { setErrorCode, setEvents } from "./HistoryEventReducer"

export const fetchHistoryEvents = () => async(dispatch: any) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    try {
        const response = await axios({
            url: `${"http://localhost:8090/api"}/history/event`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
        })
        dispatch(setEvents({
            isLoading: false, 
            events: response.data,
            code: null
        }))
    } catch (error) {
        if(error instanceof AxiosError && error.response) {
            dispatch(setErrorCode(error.response.status));
        }
        console.log(error)
    }
}