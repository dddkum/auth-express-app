import $api, { API_URL } from '../api/api'
import { useAuthStore } from '../store/auth_store'
import axios from 'axios'
import { IAuthResponse } from '../types/IAuthResponse'
import { useCurrentUserStore } from '../store/currentUser_store'

export const register = async (email: string, password: string) => {
    try {
        const response = await $api.post('/registration', { email, password })
        console.log(response.data)
    } catch (error) {
        console.error('register error', error)
    }
}

export const login = async (email: string, password: string) => {
    const authStore = useAuthStore.getState()
    const currentUserStore = useCurrentUserStore.getState()

    try {
        const response = await $api.post('/login', { email, password })
        if (response.status === 200) {
            authStore.setToken(response.data.accessToken)
            currentUserStore.setUser(response.data.user)
            authStore.setIsAuthenticated(true)
        } else {
            authStore.setIsAuthenticated(false)
        }
    } catch (error) {
        console.error('login error', error)
        authStore.setIsAuthenticated(false)
    }
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
