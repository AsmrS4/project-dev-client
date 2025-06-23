import axios from "axios"
import type { IRegister } from "src/models/Auth/Auth"

export const registerUser = async(payload: IRegister) => {
    try {
        const response = await axios({
            url:`${"http://localhost:8090/api"}/auth/sign-up`,
            method: 'POST',
            data: {
                ...payload
            }
        })
        return response.data
    } catch (error) {
        if(error.response && error.response.status === 400) {
            console.log(error)
            return error.response.data["error: "]
        }
    }
}