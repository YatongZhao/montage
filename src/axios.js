import axios from 'axios';
const isProd = process.env.NODE_ENV === 'production';
console.log(isProd);

const Axios = axios.create({
    timeout: 5000,
    baseURL: isProd ? '/api/' : 'http://localhost:8081/api/'
});

export default Axios;
