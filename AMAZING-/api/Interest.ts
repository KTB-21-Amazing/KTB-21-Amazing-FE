import api from './instance';

interface KeywordsProps {
  keywords: string[];
}

const accessToken = localStorage.getItem('access_token');

/**
 * 관심사 선택 페이지
 * @param keywords - 선택된 키워드 배열
 * @returns
 */
export const postKeywords = async ({ keywords }: KeywordsProps) => {
  const tempToken = localStorage.getItem('tempToken');

  try {
    const response = await api.post('/accounts/register', keywords, {
      headers: {
        Authorization: `Bearer ${tempToken}`,
      },
    });
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error('관심사 저장 오류', error);
  }
};

export const putKeywords = async ({ keywords }: KeywordsProps) => {
  try {
    const response = await api.put('/accounts/register/edit', keywords, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    console.error('관심사 편집 오류', error);
  }
};
