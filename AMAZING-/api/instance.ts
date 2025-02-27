import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('access_token이 설정되지 않았습니다.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 설정 (선택 사항)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('nickname');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default api;
