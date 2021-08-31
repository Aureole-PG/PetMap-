import axios from 'axios';
const api = axios.create(
    {
        baseURL: `/api`
    }

)

export const gpsApi = axios.create({
    headers: {"Access-Control-Allow-Origin": "*"},
    baseURL:  `${process.env.NEXT_PUBLIC_GPS_API}/api`
})

export default api