import axios from 'axios';

export default axios.create({
    baseURL:import.meta.env.ORDERS_SERVICE_URL
});
