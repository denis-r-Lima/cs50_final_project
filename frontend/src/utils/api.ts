import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

api.defaults.headers['Authorization'] = 123456
api.defaults.timeout = 2500
api.defaults.withCredentials = true

export default api