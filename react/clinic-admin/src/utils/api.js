import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://178.18.246.233:8000/'
});

export default instance;