import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 8px solid #f3f3f3; /* 바깥 원 색상 */
  border-top: 8px solid #3498db; /* 애니메이션 원 색상 */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1.5s linear infinite;
  margin: 20px auto;
`;

export const Message = styled.div`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-top: 20px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: transport; /* 배경색 */
`;
