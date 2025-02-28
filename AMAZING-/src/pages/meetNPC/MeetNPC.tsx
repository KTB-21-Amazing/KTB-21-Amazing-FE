import * as S from './MeetNPC.Style';
import npc from '../../assets/images/npc.png';
import { useEffect, useState } from 'react';
import { getQuiz, getQuizResult } from '../../api/GameApi';
import Loading from '../../components/common/Loading/Loding';

interface QuizDataProps {
  QuizDescription: string;
} // 퀴즈 데이터 반환 타입

interface AnswerDataProps {
  answerDescription: string;
  result: string;
} // 정답 데이터 반환 타입

const MeetNPC = () => {
  const [quizData, setQuizData] = useState<QuizDataProps | null>(null);
  const [answer, setAnswer] = useState<AnswerDataProps | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // 🎯 퀴즈 데이터 가져오기
  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const quiz = await getQuiz(); // API 호출
        setQuizData(quiz?.data);
      } catch (error) {
        console.error('Failed to fetch quiz:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  // 🎯 사용자의 답변을 처리하는 함수
  const handleAnswerClick = async (userAnswer: string) => {
    try {
      const res = await getQuizResult(userAnswer); // 사용자의 선택을 서버에 요청
      setAnswer(res?.data); // 정답 데이터 업데이트
    } catch (error) {
      console.error('Failed to fetch quiz result:', error);
    }
    setIsSelected(true);
  };

  // 🎯 answer 값이 변경될 때 다시 렌더링하도록 함
  useEffect(() => {
    if (answer) {
      setSelectedAnswer(null); // 정답이 도착하면 선택한 답변 상태 초기화
    }
  }, [answer]);

  return (
    <S.Background>
      <S.Head>
        <S.TimeOut />
      </S.Head>
      <S.Bottom>
        <S.NpcImg src={npc} />
        {isLoading ? (
          <Loading />
        ) : (
          <S.Interact>
            <S.TalkBox>
              {answer ? (
                <S.TextBox>{answer.answerDescription}</S.TextBox>
              ) : selectedAnswer ? (
                <S.TextBox>잠시만요... 🤔</S.TextBox> // API 요청 중 상태 표시
              ) : (
                <S.TextBox>{quizData?.QuizDescription}</S.TextBox>
              )}
            </S.TalkBox>
            {!isSelected && (
              <S.AnswerBox>
                <S.ChooseBox onClick={() => handleAnswerClick('1')}>1번인듯!</S.ChooseBox>
                <S.ChooseBox onClick={() => handleAnswerClick('2')}>2번인듯!</S.ChooseBox>
                <S.ChooseBox onClick={() => handleAnswerClick('3')}>3번인듯!</S.ChooseBox>
              </S.AnswerBox>
            )}
          </S.Interact>
        )}
      </S.Bottom>
    </S.Background>
  );
};

export default MeetNPC;
