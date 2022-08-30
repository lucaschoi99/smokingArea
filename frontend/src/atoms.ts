import { atom } from "recoil";

export const isDarkTheme = atom<boolean>({
  key: "isDarkTheme",
  default: false,
});
