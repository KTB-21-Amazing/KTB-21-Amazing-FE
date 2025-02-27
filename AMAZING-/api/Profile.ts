import api from './instance';

const accessToken = localStorage.getItem('access_token');

/**
 * 프로필 정보 조회
 * @returns
 */
export const getUser = async () => {
  try {
    const response = await api.get('/accounts/profile/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success) {
      return {
        name: response.data.data.name,
        profilePath: response.data.data.profilePath,
        keywords: response.data.data.keywords || ['키워드 없음'],
        point: response.data.data.point || 0,
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * 출석 현황 조회
 * @returns
 */
export const getAttendance = async () => {
  try {
    const response = await api.get('/accounts/profile/attendance', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success) {
      return response.data.data.attendanceList;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 스크랩 뉴스 리스트 조회
 * @param page - 페이지네이션
 * @returns
 */
export const getScrap = async (page: number) => {
  try {
    const response = await api.get('/accounts/profile/scrap', {
      params: { page },
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
 * 스크랩 뉴스 스크랩 해제
 * @param newsId - 스크랩 취소할 뉴스의 아이디
 */
export const deleteScrap = async (newsId: number) => {
  try {
    await api.delete('/accounts/profile/unscrap', {
      params: { newsId },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * 프로필 정보 수정
 * @param name - 변경할 이름
 * @param file - 변경할 프로필 이미지 파일
 * @returns
 */
export const patchProfile = async (name?: string, file?: File) => {
  try {
    const formData = new FormData();

    if (name) {
      formData.append('name', name);
    }

    if (file) {
      formData.append('file', file);
    }

    const response = await api.patch('/accounts/profile/edit', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.data.success) {
      return response.data.data.name;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 관심사 수정
 * @param keywords - 수정할 관심사 키워드 리스트
 * @returns
 */
export const putKeywords = async (keywords: string[]) => {
  try {
    const response = await api.put('/accounts/register/edit', keywords, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.success;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 나의 활동 - 관심사 분석 조회
 * @returns
 */
export const getInterest = async () => {
  try {
    const response = await api.get('/accounts/profile/interest', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.success) {
      return response.data.data.interest;
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * 퀴즈 현황 조회
 * @returns
 */
export const getQuiz = async () => {
  try {
    const response = await api.get('/accounts/profile/quiz', {
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
 * 나의 활동 - 나의 인사이트 리스트 조회
 * @param page - 무한스크롤 페이지
 * @returns
 */
export const getInsight = async (page: number) => {
  try {
    const response = await api.get('/accounts/profile/insight', {
      params: { page },
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
 * 분석 레포트 조회
 * @returns
 */
export const getReport = async () => {
  try {
    const response = await api.get('/accounts/report', {
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
