import axios from 'axios';
import { globalConfig } from "../app.config"

export const fetchPlaces = async (query: string) => {
    const url = `${globalConfig.apiUri}/places?${query}`
    const res = await axios.get(url);
    return res.data
}