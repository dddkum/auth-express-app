import $api, { API_URL } from '../app/api/api'
import { useAuthStore } from '../app/store/auth_store'
import axios from 'axios'
import { IAuthData, IAuthResponse } from '../app/types/IAuthResponse'
import { useCurrentUserStore } from '../app/store/currentUser_store'
import { useCustomToast } from '../shared/hooks/UseCustomToast/UseCustomToast.ts'

export const register = async (data: IAuthData) => {
    await $api
        .post('/registration', { data })
        .then(response =>
            useCustomToast({ message: response.data.message, type: 'success' })
        )
        .catch(error =>
            useCustomToast({
                message: error.response.data.message,
                type: 'error',
            })
        )
}

export const login = async (data: IAuthData) => {
    const { setToken, setIsAuthenticated } = useAuthStore.getState()
    const { setUser } = useCurrentUserStore.getState()

    await $api
        .post('/login', { data })
        .then(response => {
            setToken(response.data.accessToken)
            setUser(response.data.user)
            setIsAuthenticated(true)
            useCustomToast({
                message: response.data.message,
                type: 'success',
            })
        })
        .catch(error => {
            useCustomToast({
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
    const { setToken } = useAuthStore.getState()
    await axios
        .get<IAuthResponse>(`${API_URL}/refresh`, {
            withCredentials: true,
        })
        .then(response => setToken(response.data.accessToken))
        .catch(error => console.log(error.response.data.message))
}
