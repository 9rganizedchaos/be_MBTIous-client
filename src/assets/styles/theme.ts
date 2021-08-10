// 전역-스타일 모음

import { DefaultTheme } from "styled-components";

const violetTheme: DefaultTheme = {
  color: {
    main: "#705DF2",
    sub: "#1b1b1b",
    sub2: "white"
  },
  size: {
    mobile: "max-width: 768px",
    tablet: "max-width: 1024px"
  }
};

const pinkTheme: DefaultTheme = {
  color: {
    main: "#ebbcc2",
    sub: "#ebebeb",
    sub2: "white"
  },
  size: {
    mobile: "max-width: 768px",
    tablet: "max-width: 1024px"
  }
};

export { pinkTheme, violetTheme };