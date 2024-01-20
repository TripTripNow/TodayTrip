import axios from 'axios';

const BASE_URL = 'https://sp-globalnomad-api.vercel.app/1-9/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
