import axios from 'axios';

const BASE_API_URI = 'https://explorio.aboutlasttrip.com/api/v1'
// const BASE_API_URI = 'http://localhost:3000/api/v0'

export const fetchPlaces = async (query: string) => {
    const url = `${BASE_API_URI}/places?${query}`
    const res = await axios.get(url);
    return res.data.places
}