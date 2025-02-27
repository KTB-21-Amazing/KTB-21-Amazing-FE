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
  display: flex;
  justify-content: center;
  height: 80%;
  bottom: 0;
  left: 0;
  width: 100%;
  //background-color: red;
`;

export const myImg = styled.img`
  position: absolute;
  height: 80%;
  image-rendering: pixelated;
  bottom: 50px;
  left: 100px;
`;

export const TalkBox = styled.div`
  align-items: center;
  display: flex;
  position: absolute;
  bottom: 20px;
  min-height: 30%;
  border-radius: 10px;
  margin: 30px;
  width: 80%;
  padding: 20px 50px;
  font-size: 40px;
  overflow: hidden;
  background-color: PeachPuff;
`;

export const InputBox = styled.div`
  display: flex;
  letter-spacing: 5px;
  gap: 40px;
  margin: 0px 20px;
  align-items: center;
  flex: 1;
`;

export const nameInput = styled.input`
  border: none;
  font-size: 40px;
`;

export const nextPart = styled.div`
  font-size: 30px;
  margin-top: 60px;
  margin-right: 10px;
  display: flex;
  gap: 15px;
  height: 100%;
  align-items: center;
`;

export const enterImg = styled.img``;

export const next = styled.p`
  font-weight: 800;
  letter-spacing: 10px;
`;
