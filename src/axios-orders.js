import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-project-82894.firebaseio.com/'
})

export default instance