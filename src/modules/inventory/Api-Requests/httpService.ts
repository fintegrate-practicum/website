import axios from 'axios';

export default axios.create({
   baseURL:import.meta.env.INVENTORY_SERVICE_URL
});
