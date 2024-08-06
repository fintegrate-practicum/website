import axios from 'axios';
import qs from 'qs';
import { useJwtFromCookie } from '../../../Redux/hooks';

 

const ordersInstance = axios.create({
  baseURL: import.meta.env.VITE_ORDERS_SERVICE_URL,  
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});
ordersInstance.interceptors.request.use(
  config => {
    const token=useJwtFromCookie('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }

);


export default ordersInstance;