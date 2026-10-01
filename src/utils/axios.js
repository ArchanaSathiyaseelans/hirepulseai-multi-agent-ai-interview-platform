import axios from "axios";

// If VITE_BACKEND_URL points to localhost or isn't set, use relative URL to route through Express server proxy
const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || '';
const baseURL = (rawBackendUrl.includes('localhost') && window.location.hostname !== 'localhost') 
  ? '' 
  : rawBackendUrl;

const api = axios.create({
    baseURL,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('hirepulse_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['x-session-id'] = token;
        }
    } catch (e) {
        // localStorage might be restricted in some strict iframe sandbox settings
    }
    return config;
});

export default api;

