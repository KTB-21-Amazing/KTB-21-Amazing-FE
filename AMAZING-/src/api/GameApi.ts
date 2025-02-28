import api from './instance';

/**
 * 미로 정보 조회
 * @returns
 */
export const getMaze = async (data:{loc:number[]}|{}) => {
  try {
    const response = await api.post('/maze',data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 세계관 조회
 * @param name - 사용자 입력 이름
 * @param location - 사용자 입력 장소
 * @param mood - 사용자 입력 분위기
 * @returns
 */
export const getWorld = async (name: string, location: string, mood: string) => {
  try {
    const response = await api.post('/world', {
      name,
      location,
      mood,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 퀴즈 설명 조회
 * @returns
 */
export const getQuiz = async () => {
  try {
    const response = await api.get('/npc_quiz');
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 퀴즈 결과 조회
 * @param - 사용자 퀴즈 정답 제출
 * @returns
 */
export const getQuizResult = async (answer: string) => {
  try {
    const response = await api.post('/npc_quiz_result', {
      answer,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 게임 결과 조회
 * @returns
 */
export const getFinish = async () => {
  try {
    const response = await api.get('/end_game');
    return response;
  } catch (error) {
    console.error(error);
  }
};
