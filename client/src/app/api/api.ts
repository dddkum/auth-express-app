import axios from 'axios'
import { useAuthStore } from '../store/auth_store.ts'

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use(
    config => {
        const token = useAuthStore.getState().token
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    error => Promise.reject(error)
)

$api.interceptors.response.use(
    response => {
        if (response.headers && response.headers['authorization']) {
            const token = response.headers['authorization'].split('Bearer ')[1]
            useAuthStore.getState().setToken(token)
        }

        return response
    },
    error => {
        if (!error) {
            return Promise.reject(error)
        }

        if (error.response.headers && error.response.headers['authorization']) {
            const token =
                error.response.headers['authorization'].split('Bearer ')[1]
            useAuthStore.getState().setToken(token)
        }

        switch (error.response.status) {
            case 401:
                useAuthStore.getState().reset()
                break
        }

        return Promise.reject(error)
    }
)

export default $api
