import { atom } from "recoil";

export const defaultCoords = {
  // 서울시청 좌표
  lat: 37.5666805,
  lng: 126.9784147,
};

export interface ICoords {
  lat: number;
  lng: number;
}

export interface ISmokingAreaPreview {
  title: string;
  coords: ICoords;
  id: number;
}

export interface ISmokingAreaDetail {
  title: string;
  coords: ICoords;
  id: number;
}

export const isDarkTheme = atom<boolean>({
  key: "isDarkTheme",
  default: false,
});

export const isCoordsAvailableState = atom<boolean>({
  key: "isCoordsAvailableState",
  default: false,
});

export const myCoordsState = atom<ICoords>({
  key: "myCoordsState",
  default: defaultCoords,
});

export const mapCenterState = atom<ICoords>({
  key: "mapCenterState",
  default: defaultCoords,
});

export const boundsChangedState = atom<boolean>({
  key: "boundsChangedState",
  default: false,
});

export const mapNorthEastState = atom<ICoords>({
  key: "mapNorthEastState",
  default: defaultCoords,
});

export const mapSouthWestState = atom<ICoords>({
  key: "mapSouthWestState",
  default: defaultCoords,
});

export const loggedInState = atom<boolean>({
  key: "loggedInState",
  default: false,
});

export const smokingAreasState = atom<ISmokingAreaPreview[]>({
  key: "smokingAreasState",
  default: [],
});

export const selectedState = atom<ISmokingAreaPreview | null>({
  key: "selectedState",
  default: null,
});

export const customVHState = atom<string>({
  key: "customVHState",
  default: "1vh",
});
