import axios from 'axios';

// const BASE_API_URI = 'https://explorio.aboutlasttrip.com/api/v1'
const BASE_API_URI = 'http://localhost:3000/api/v0'

export const authLogin = async (email: string, password: string) => {
    const url = `${BASE_API_URI}/auth/login`
    const res = await axios.post(url, {email, password});
    return res.data.token
}