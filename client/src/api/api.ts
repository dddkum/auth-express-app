import axios from "axios";
import { useAuthStore } from "../store/auth";

export const BASE_URL = 'http://localhost:5000'

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
})

$api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default $api;