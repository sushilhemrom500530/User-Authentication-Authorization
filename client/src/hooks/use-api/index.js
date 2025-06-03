import axios from 'axios';
import Cookies from "js-cookie";


const apiBaseUrl = import.meta.env.VITE_API_URL;

if (!apiBaseUrl) {
    throw new Error("VITE_API_URL is not defined in your environment variables.");
}

// Create an Axios instance with the base URL
const useApi = axios.create({
    baseURL: apiBaseUrl,
});

useApi.interceptors.request.use(
    config => {

        const token = Cookies.get('authToken') || null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

useApi.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            console.log("Your are unauthorized!")
            Cookies.remove('authToken');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default useApi;