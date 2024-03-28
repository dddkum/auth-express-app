import $api, { API_URL } from '../app/api/api'
import { useAuthStore } from '../app/store/auth_store'
import axios from 'axios'
import { IAuthData, IAuthResponse } from '../app/types/IAuthResponse'

export const signUp = async ({ email, password }: IAuthData) => {
    const response = await $api.post('/registration', { email, password })
    return response
}

export const signIn = async ({ email, password }: IAuthData) => {
    const response = await $api.post('/login', { email, password })
    return response
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
