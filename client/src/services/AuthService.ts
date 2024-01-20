import $api from '../api/api';

export const register = async (email: string, password: string) => {
    try {
        const response = await $api.post('/api/register', { email, password });
        return response.data;
    } catch (error) {
        console.error('register error', error);
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await $api.post('/api/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('login error', error);
    }
};

export const logout = async () => {
    try {
        const response = await $api.post('/api/logout');
        return response.data;
    } catch (error) {
        console.error('logout error', error);
    }
};
