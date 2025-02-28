import React, { useEffect, useState } from 'react';
import * as S from './Userform.Style';
import myImg from '../../assets/images/player_walk1.webp';
import enterImg from '../../assets/icons/Enter.svg';
import { useNavigate } from 'react-router-dom';
import { getWorld } from '../../api/GameApi';
import Loading from '../../components/common/Loading/Loding';

const questions = [
  '당신의 이름은?',
  '너가 모험하고 싶은 장소는 어디야?',
  '그 장소의 분위기는 어때?',
];

interface StoryDataProps {
  worldDescription: string;
  image: string;
}

const Userform = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [mood, setMood] = useState('');
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [story, setStory] = useState<StoryDataProps | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false); // API 호출을 위한 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getWorld(name, location, mood);
        if (res !== null) {
          setStory(res?.data);
        }
        console.log('📜 Story fetched: ', res?.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    // 모든 질문 입력이 끝나고, `isSubmitted`이 `true`일 때만 실행
    if (isSubmitted) {
      fetchData();
    }
  }, [isSubmitted, name, location, mood]); // `isSubmitted` 상태를 감지

  useEffect(() => {
    if (story) {
      console.log('📜 Updated Story:', story.worldDescription);
      navigate('/maze'); // ✅ story가 설정되면 페이지 이동
    }
  }, [story, navigate]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    // 질문에 맞게 상태 업데이트
    if (index === 0) setName(value);
    if (index === 1) setLocation(value);
    if (index === 2) setMood(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter' && answers[index].trim() !== '') {
      if (index < questions.length - 1) {
        setQuestionIndex(index + 1); // 다음 질문으로 이동
      } else {
        alert(`🎉 ${name}님의 맵이 생성되었습니다. 모험을 떠나볼까요? 🎉`);
        setIsSubmitted(true);
      }
    }
  };

  return (
    <S.Background>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <S.myImg src={myImg} />
          <S.Bottom>
            <S.TalkBox>
              <S.InputBox>
                {questions.map((question, index) => (
                  <div key={index} style={{ display: index === questionIndex ? 'block' : 'none' }}>
                    <p>{question}</p>
                    <S.nameInput
                      type="text"
                      placeholder="답변을 입력하세요"
                      value={answers[index] || ''}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </div>
                ))}
              </S.InputBox>
              <S.nextPart>
                <S.enterImg src={enterImg} />
                <S.next>Enter</S.next>
              </S.nextPart>
            </S.TalkBox>
          </S.Bottom>
        </>
      )}
    </S.Background>
  );
};

export default Userform;
