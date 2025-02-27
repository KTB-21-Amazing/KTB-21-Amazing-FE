import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Fonts from './Fonts';

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  ${reset}
  ${Fonts}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Galmuri14';
  }

  body,
  html {
    font-family: 'Galmuri14';
    cursor: default;
  }

  input {
    background: none;
    outline: none;
  }
`;

export default GlobalStyles;
