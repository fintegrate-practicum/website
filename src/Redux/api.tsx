// api.js
import axios from 'axios';
import { Jwt } from './hooks';

// פונקציה לדוגמה שמחזירה את ה-token
const http = import.meta.env.VITE_SERVER_URL;
const accessToken = Jwt('accessToken');
console.log('Token:', accessToken);
// צור אינסטנס של axios
const api = axios.create({
    baseURL:http, // שנה ל-URL של ה-API שלך
    timeout: 10000, // זמן המתנה מקסימלי לקריאה
});

// הוסף Interceptor לבקשות
api.interceptors.request.use(
    config => {
        const token = accessToken
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
