import axios from 'axios';

const baseURL = process.env.REACT_APP_URL as string || 'http://192.168.40.177:8000';
console.log('REACT_APP_URL:', typeof process.env.REACT_APP_URL);
console.log('REACT_APP_URL:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
