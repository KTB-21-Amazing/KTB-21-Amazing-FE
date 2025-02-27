import api from './instance';

const accessToken = localStorage.getItem('access_token');

/**
 * 스크랩 버튼 클릭
 * @param id - 스크랩할 뉴스의 아이디
 * @returns
 */
export const postScrap = async (id: number) => {
  try {
    const response = await api.post(
      `/news/scrap/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.success;
  } catch (error) {
    console.error(error);
  }
};
