import React, { useState } from 'react';
import * as S from './Userform.Style';
import myImg from '../../assets/images/player_cheer1.png';
import enterImg from '../../assets/icons/Enter.svg';
import { useNavigate } from 'react-router-dom';

const questions = [
  '당신의 이름은?',
  '너가 모험하고 싶은 장소는 어디야?',
  '그 장소의 분위기는 어때?',
];

const Userform = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [questionIndex, setQuestionIndex] = useState(0); // 현재 질문 인덱스

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex((prev) => prev + 1); // 다음 질문으로 이동
        setUsername(''); // 입력값 초기화
      } else {
        alert('🎉 게임을 시작합니다! 🎉'); // 마지막 질문일 때 처리
        navigate('/maze');
      }
    }
  };

  return (
    <S.Background>
      <S.myImg src={myImg} />
      <S.Bottom>
        <S.TalkBox>
          <S.InputBox>
            <p>{questions[questionIndex]}</p>
            {questionIndex < questions.length ? (
              <S.nameInput
                type="text"
                placeholder="이름을 입력하세요"
                value={username}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <p></p>
            )}
          </S.InputBox>
          <S.nextPart>
            <S.enterImg src={enterImg} />
            <S.next>Enter</S.next>
          </S.nextPart>
        </S.TalkBox>
      </S.Bottom>
    </S.Background>
  );
};

export default Userform;
