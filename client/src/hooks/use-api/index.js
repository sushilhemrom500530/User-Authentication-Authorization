import axios from 'axios';
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_URL;

if (!apiBaseUrl) {
    throw new Error("VITE_API_URL is not defined in your environment variables.");
}

const useApi = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true, 
});

// === REQUEST INTERCEPTOR ===
useApi.interceptors.request.use(
    config => {
        const token = Cookies.get('auth_token'); 
        console.log("Token is :",token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// === RESPONSE INTERCEPTOR ===
useApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized: clearing token and redirecting.");
            Cookies.remove('auth_token'); 
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default useApi;
