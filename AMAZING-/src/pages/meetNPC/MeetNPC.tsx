import * as S from './MeetNPC.Style';
import npc from '../../assets/images/npc.png';
import { useState } from 'react';

const MeetNPC = () => {
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerClick = async (userAnswer: string) => {
    if (userAnswer === '2') {
      setIsCorrect(true);
      console.log('맞아');
    } else {
      setIsCorrect(false);
      console.log('틀려');
    } //sendQuizAnswer(Number(id), userAnswer);
  };

  return (
    <S.Background>
      <S.Head>
        <S.TimeOut></S.TimeOut>
      </S.Head>
      <S.Bottom>
        <S.NpcImg src={npc} />
        <S.Interact>
          <S.TalkBox>
            {isCorrect ? (
              <S.TextBox>정답이야^^~~</S.TextBox>
            ) : (
              <S.TextBox>넌 뭘고를거니?</S.TextBox>
            )}
          </S.TalkBox>
          <S.AnswerBox>
            <S.ChooseBox onClick={() => handleAnswerClick('1')}>나는이거~</S.ChooseBox>
            <S.ChooseBox onClick={() => handleAnswerClick('2')}>나는이거~</S.ChooseBox>
            <S.ChooseBox onClick={() => handleAnswerClick('3')}>나는이거~</S.ChooseBox>
          </S.AnswerBox>
        </S.Interact>
      </S.Bottom>
    </S.Background>
  );
};

export default MeetNPC;
