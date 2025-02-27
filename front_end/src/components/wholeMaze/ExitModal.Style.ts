import styled from 'styled-components';

export const ModalPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 26.25rem;
  heigh: 10rem;
  border-radius: 1rem;
  background: white;
  @media (max-width: 767px) {
    width: 20.25rem;
  }
`;
