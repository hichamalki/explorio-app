import axios from 'axios';
import { globalConfig } from "../app.config"

export const signin = async (payload: {email: string, password: string}) => {
    const url = `${globalConfig.apiUri}/auth/login`
    const res = await axios.post(url, payload);
    return res.data.token
}

export const signup = async (payload: {firstName: string, lastName: string, email: string, password: string}) => {
    const url = `${globalConfig.apiUri}/auth/signup`
    const res = await axios.post(url, payload);
    return res.data
}