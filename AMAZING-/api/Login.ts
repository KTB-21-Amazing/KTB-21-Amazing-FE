import api from './instance';

/**
 * 로그인(회원가입)
 * @param code
 * @returns
 */
export const login = async (code: string) => {
  if (!code) {
    throw new Error('Code 값이 없습니다.');
  }

  try {
    const params = new URLSearchParams();
    params.append('code', code);

    const response = await api.post('/accounts/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error('로그인(회원가입) 실패', error);
  }
};

/**
 * 토큰 재발급
 */
export const getAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await api.post('/accounts/token/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.data.success) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
  } catch (error) {
    console.error('AccessToken 요청 실패', error);
  }
};
