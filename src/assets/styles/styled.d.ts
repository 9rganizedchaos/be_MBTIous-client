// 스타일-타입정의 모음

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      main: string;
      sub: string;
    };
  }
}