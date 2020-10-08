import axios from 'axios';

const trackApi = axios.create({
    baseURL: 'https://trackserver.loca.lt/'
});

export default trackApi;