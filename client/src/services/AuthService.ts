import $api, {API_URL} from '../api/api';
import {useAuthStore} from "../store/auth";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {useCurrentUserStore} from "../store/currentUser";

export const register = async (email: string, password: string) => {
    const authStore = useAuthStore.getState();

    try {
        const response = await $api.post('/registration', {email, password});
        console.log(response.data)
    } catch (error) {
        console.error('register error', error);
    }
};

export const login = async (email: string, password: string) => {
    const authStore = useAuthStore.getState();

    try {
        const response = await $api.post('/login', {email, password});
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
        const response = await $api.post('/logout');
        console.log(response.data)
    } catch (error) {
        console.error('logout error', error);
    } finally {
        authStore.reset()
    }
};

export const checkAuth = async () => {
    const authStore = useAuthStore.getState();
    try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
        console.log(response);
        authStore.setToken(response.data.accessToken)
        authStore.setIsAuthorized(true);
    } catch (error) {
        console.log(error.response?.data?.message)
    }
}