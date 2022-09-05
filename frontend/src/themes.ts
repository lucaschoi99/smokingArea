import { DefaultTheme } from "styled-components";

const colors = {
  kakaoBlue: "#268fff",
};

export const lightTheme: DefaultTheme = {
  maxWidth: "743px",
  bgColor: "white",
  textColor: "black",
  colors,
};

export const darkTheme: DefaultTheme = {
  maxWidth: "743px",
  bgColor: "black",
  textColor: "white",
  colors,
};
