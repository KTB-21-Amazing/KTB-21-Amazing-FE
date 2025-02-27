import api from './instance';

const accessToken = localStorage.getItem('access_token');

/**
 * 뉴스 정보 조회
 * @param id - 뉴스 id
 * @param locationProp - 어디서 선택한 뉴스인지에 따라 keyword, category, subCategory
 * @returns
 */
export const getDetailNews = async (
  id: number,
  locationProp: { category?: string; keyword?: string; subCategory?: string } | null,
) => {
  try {
    const res = await api.get(`/news/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...(locationProp && { params: locationProp }),
    });

    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 퀴즈 조회
 * @param id - 뉴스 id
 * @returns
 */
export const getDetailQuiz = async (id: number) => {
  try {
    const res = await api.get(`/news/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 인사이트 조회
 * @param id - 뉴스 id
 * @returns
 */
export const getDetailInsight = async (id: number) => {
  try {
    const res = await api.get(`/news/insight/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 공감 조회
 * @param id - 뉴스 id
 * @returns
 */
export const getDetailLikes = async (id: number) => {
  try {
    const res = await api.get(`/news/likes/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.data.success) {
      return res.data.data;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 인사이트 등록
 * @param id - 뉴스 id
 * @param comment - 유저 인사이트 입력값
 * @returns
 */
export const sendInsight = async (id: number, comment: string) => {
  try {
    const res = await api.post(
      `/news/insight/${id}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      },
    );
    return res.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * 퀴즈 풀기
 * @param id - 뉴스 id
 * @param userAnswer - 유저가 선택한 답
 * @returns
 */
export const sendQuizAnswer = async (id: number, userAnswer: boolean) => {
  try {
    const res = await api.post(
      `/news/quiz/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { userAnswer }, // 쿼리 매개변수로 전달
      },
    );
    return res.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * 공감버튼 클릭
 * @param id - 뉴스 id
 * @param reactionType - 누른 공감버튼 (0,1,2)
 * @returns
 */
export const sendLikes = async (id: number, reactionType: number) => {
  try {
    const res = await api.post(
      `/news/likes/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { reactionType },
      },
    );
    return res.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};
