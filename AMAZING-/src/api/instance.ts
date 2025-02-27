import axios from 'axios';

const api = axios.create({
  baseURL: proccess.env.REACT_APP_URL as string,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
