import $api from '../api/api';
import {useAuthStore} from "../store/auth";

export const register = async (email: string, password: string) => {
    try {
        const response = await $api.post('/api/register', { email, password });
        console.log(response.data)
    } catch (error) {
        console.error('register error', error);
    }
};

export const login = async (email: string, password: string) => {
    const authStore = useAuthStore.getState()
    try {
        const response = await $api.post('/api/login', { email, password });
        authStore.setToken(response.data.accessToken)
    } catch (error) {
        console.error('login error', error)
        authStore.setIsAuthorized(false)
    } finally {
        authStore.setIsAuthorized(true)
    }
};

export const logout = async () => {
    const authStore = useAuthStore.getState()
    try {
        const response = await $api.post('/api/logout');
        console.log(response.data)
    } catch (error) {
        console.error('logout error', error);
    } finally {
        authStore.reset()
    }
};
