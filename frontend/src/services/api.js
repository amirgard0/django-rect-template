import axios from 'axios';

let accessToken = null;

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Add request interceptor to include the access token in headers
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && error.config && !error.config._retry) {
            error.config._retry = true;
            try {
                const { data } = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: localStorage.getItem('refresh_token'),
                });
                accessToken = data.access;
                error.config.headers.Authorization = `Bearer ${data.access}`;
                return api(error.config);
            } catch (err) {
                localStorage.removeItem('refresh_token');
                accessToken = null;
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const setAccessToken = (token) => {
    accessToken = token;
};

export default api;
