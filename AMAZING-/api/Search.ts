import api from './instance';

const accessToken = localStorage.getItem('access_token');

/**
 * 검색 결과 조회
 * @param searchWord - 검색 내용
 * @param page - 검색 페이지
 * @returns
 */
export const getSearchResults = async (searchWord: string, page: number) => {
  try {
    const res = await api.get(`/search`, {
      headers: {
        Authorization: ` Bearer ${accessToken}`,
        Accept: 'application/json',
      },
      params: { searchWord, page },
    });
    if (res.data.data) {
      return res.data.data;
    }
  } catch (err) {
    console.error('검색 오류:', err);
    alert(err);
  }
};
