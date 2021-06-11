import axios from 'axios';
const api = axios.create(
    {
        baseURL: `/api`
    }

)

export const gpsApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GPS_API
})

export default api