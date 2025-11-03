import axios from 'axios';
import { globalConfig } from "../app.config"

export const fetchCities = async (category: string) => {
    const url = `${globalConfig.apiUri}/settings/cities?category=${category}`
    const res = await axios.get(url);
    return res.data
}