import axios from 'axios';
import { globalConfig } from "../app.config"

export const fetchCities = async () => {
    const url = `${globalConfig.apiUri}/settings/cities`
    const res = await axios.get(url);
    return res.data
}