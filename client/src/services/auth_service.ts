import $api, { API_URL } from '../api/api'
import { useAuthStore } from '../store/auth_store'
import axios from 'axios'
import { IAuthResponse, ILoginData } from '../types/IAuthResponse'
import { useCurrentUserStore } from '../store/currentUser_store'
import { useToast } from '../components/toasts/UseToast.ts'

export const register = async (email: string, password: string) => {
    try {
        const response = await $api.post('/registration', { email, password })
        console.log(response.data)
    } catch (error) {
        console.error('register error', error)
    }
}

export const login = async (data: ILoginData) => {
    const { setToken, setIsAuthenticated } = useAuthStore.getState()
    const { setUser } = useCurrentUserStore.getState()

    await $api
        .post('/login', { data })
        .then(response => {
            setToken(response.data.accessToken)
            setUser(response.data.user)
            setIsAuthenticated(true)
            useToast({
                message: response.data.message,
                type: 'success',
            })
        })
        .catch(error => {
            useToast({
                message: error.response.data.message,
                type: 'error',
            })
            setIsAuthenticated(false)
        })
}

export const logout = async () => {
    const authStore = useAuthStore.getState()
    try {
        const response = await $api.post('/logout')
        console.log(response.data)
    } catch (error) {
        console.error('logout error', error)
    } finally {
        authStore.reset()
    }
}

export const checkAuth = async () => {
    const authStore = useAuthStore.getState()
    try {
        const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
            withCredentials: true,
        })
        authStore.setToken(response.data.accessToken)
    } catch (error) {
        console.log(error.response?.data?.message)
    }
}
