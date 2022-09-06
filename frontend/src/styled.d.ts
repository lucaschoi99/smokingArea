// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    maxWidth: string;
    bgColor: string;
    textColor: string;
    colors: {
      kakaoBlue: string;
    };
  }
}
