import axios from 'axios';

export default axios.create({
    baseURL:import.meta.env.VITE_ORDERS_SERVICE_URL
});
