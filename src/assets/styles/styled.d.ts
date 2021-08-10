// 스타일-타입정의 모음

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      main: string;
      sub: string;
      sub2: string;
    };
    size: {
      mobile: string;
      tablet: string;
    }
  }
}