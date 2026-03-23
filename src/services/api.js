import axios from 'axios';

// Automatically point to Localhost during development, and Render during production!
const API_URL = import.meta.env.MODE === 'development' 
    ? 'http://127.0.0.1:5000' 
    : 'https://url-0bp8.onrender.com';

const api = axios.create({
    baseURL: API_URL,
});

// 1. REQUEST INTERCEPTOR: Attach the JWT token automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 2. RESPONSE INTERCEPTOR: Catch 401 Unauthorized globally!
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // If the server rejects the token, instantly wipe it and kick user to login
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
