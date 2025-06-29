import axios, { AxiosError } from "axios"
import { setErrorCode, setEvents, setLoading } from "./EventReducer"

export const fetchEvents = (startTime?:string, endTime?:string) => async(dispatch: any) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    let query = '?';
    if(startTime) {
        query+=`startDate=${startTime}&`
    }
    if(endTime) {
        query+=`endDate=${endTime}`
    }
    dispatch(setLoading(true))
    console.log(query)
    try {
        const response = await axios({
            url: `${"http://localhost:8090/api"}/event${query}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
        })
        console.log(response.data)
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