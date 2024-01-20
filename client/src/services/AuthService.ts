import $api from '../api/api';
import {useAuthStore} from "../store/auth";

export const register = async (email: string, password: string) => {
    const authStore = useAuthStore.getState();

    try {
        const response = await $api.post('/api/registration', {email, password});
        authStore.setToken(response.data.accessToken)
        console.log(response.data)
    } catch (error) {
        console.error('register error', error);
    }
};

export const login = async (email: string, password: string) => {
    const authStore = useAuthStore.getState();

    try {
        const response = await $api.post('/api/login', {email, password});
        if (response.status === 200) {
            authStore.setToken(response.data.accessToken)
            authStore.setIsAuthorized(true);
        } else {
            authStore.setIsAuthorized(false);
        }
    } catch (error) {
        console.error('login error', error);
        authStore.setIsAuthorized(false);
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
