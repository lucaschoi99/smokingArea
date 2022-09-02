import { atom } from "recoil";

export interface ICoords {
  lat: number;
  lng: number;
}

export const isDarkTheme = atom<boolean>({
  key: "isDarkTheme",
  default: false,
});

export const isCoordsAvailableState = atom<boolean>({
  key: "isCoordsAvailableState",
  default: false,
});

export const myCoordsState = atom<ICoords | undefined>({
  key: "myCoordsState",
  default: undefined,
});

export const mapCenterState = atom<ICoords>({
  key: "mapCenterState",
  default: {
    // 서울시청 좌표
    lat: 37.5666805,
    lng: 126.9784147,
  },
});
