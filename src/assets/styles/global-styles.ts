// 스타일-테마 모음

import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import "../../App.css";

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
  }
  div, span {
    user-select: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;