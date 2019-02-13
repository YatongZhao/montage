import axios from 'axios';

const Axios = axios.create({
    timeout: 5000,
    baseURL: 'http://localhost:8081/api/'
});

export default Axios;
