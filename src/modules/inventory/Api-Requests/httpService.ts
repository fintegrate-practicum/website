import axios from 'axios';

export default axios.create({
   baseURL:import.meta.env.VITE_INVENTORY_SERVICE_URL
});

