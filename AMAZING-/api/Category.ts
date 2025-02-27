import api from './instance';

const accessToken = localStorage.getItem('access_token');

/**
 * 큰 카테고리 페이지 조회
 * @param category - 카테고리["society" | "economy" | "politics"]
 * @param page - 페이지네이션
 * @returns
 */
export const getCategoryNews = async (category: string, page: number) => {
  try {
    const response = await api.get('/category', {
      params: { category, page },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 소 카테고리 페이지 조회
 * @param category - 카테고리["society" | "economy" | "politics"]
 * @param subCategory - 각 카테고리의 소카테고리
 * @param page - 페이지네이션
 * @returns
 */
export const getSubCategoryNews = async (category: string, subCategory: string, page: number) => {
  try {
    const response = await api.get('/category/sub', {
      params: { category, subCategory, page },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};
