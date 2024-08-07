import axios from 'axios';
import qs from 'qs';
import { useJwtFromCookie } from '../Redux/hooks';
import { useTranslation } from 'react-i18next';
 

const workerInstance = axios.create({
  baseURL: import.meta.env.VITE_WORKERS_SERVICE_URL,  
  paramsSerializer: params => qs.stringify(params, { indices: false }),
});
workerInstance.interceptors.request.use(
  config => {
    const token=useJwtFromCookie('accessToken')
    const { t } = useTranslation();
    if (token) {
        config.headers.Authorization = `${t('Bearer')} ${token}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }

);


export default workerInstance;
