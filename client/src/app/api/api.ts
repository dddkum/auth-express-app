import axios from 'axios'
import { useAuthStore } from '../store/auth_store.ts'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(config => {
    const token = useAuthStore.getState().token
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default $api
