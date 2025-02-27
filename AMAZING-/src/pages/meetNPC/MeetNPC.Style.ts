import styled from 'styled-components';

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/images/background.jpg'); /* ✅ 이미지 경로 */
  background-size: cover; /* ✅ 화면 꽉 채우기 */
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
`;

export const Head = styled.div``;

export const TimeOut = styled.div``;
export const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  height: 70%;
  align-items: flex-end;
  width: 100%;
`;

export const NpcImg = styled.img`
  height: 100%;
  image-rendering: pixelated;
`;

export const TalkBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  border-radius: 10px;
  width: 100%;
  padding: 30px;
  overflow: hidden;
  background-color: PeachPuff;
`;

export const TextBox = styled.div`
  flex-grow: 1;
  resize: none;
  border: none;
  background-color: transparent;
  width: 100%;
  font-size: 30px;
  letter-spacing: 5px;
  line-height: 170%;
  outline: none;
  padding-right: 10px;
  /* hover 상태에서 스크롤바가 있을 때 padding-right 조정 */
  &::hover {
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 12px; /* 스크롤바 넓이 */
    }
  }
`;

export const Interact = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 50px;
  gap: 20px;
`;

export const AnswerBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 30px;
`;

export const ChooseBox = styled.div`
  width: 100%;
  border-radius: 10px;
  font-size: 20px;
  padding: 30px;
  background-color: PeachPuff;
  cursor: pointer;
`;
