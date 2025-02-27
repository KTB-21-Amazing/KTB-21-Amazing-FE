import * as S from './MeetNPC.Style';
import npc from '../../assets/images/npc.png';

const MeetNPC = () => {
  return (
    <S.Background>
      <S.Bottom>
        <S.NpcImg src={npc} />
        <S.Interact>
          <S.TalkBox>
            <S.TextBox>넌 뭘고를거니?</S.TextBox>
          </S.TalkBox>
          <S.AnswerBox>
            <S.ChooseBox>나는이거~</S.ChooseBox>
            <S.ChooseBox>나는이거~</S.ChooseBox>
            <S.ChooseBox>나는이거~</S.ChooseBox>
          </S.AnswerBox>
        </S.Interact>
      </S.Bottom>
    </S.Background>
  );
};

export default MeetNPC;
