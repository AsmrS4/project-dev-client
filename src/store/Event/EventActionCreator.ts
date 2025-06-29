import axios, { AxiosError } from "axios"
import { setErrorCode, setEvents, setLoading } from "./EventReducer"

export const fetchEvents = () => async(dispatch: any) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    dispatch(setLoading(true))
    try {
        const response = await axios({
            url: `${"http://localhost:8090/api"}/event`,
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