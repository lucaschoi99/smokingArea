import { DefaultTheme } from "styled-components";

const colors = {
  kakaoBlue: "#268fff",
};

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  colors,
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  colors,
};
