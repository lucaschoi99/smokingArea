import { ICoords } from "./atoms";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchSmokingAreas = async (
  northEastCoords: ICoords | undefined,
  southWestCoords: ICoords | undefined
) => {
  if (!northEastCoords || !southWestCoords) return { isError: true };
  try {
    const response = await fetch(`${API_URL}/`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        northEastCoords: `(${northEastCoords.lat}, ${northEastCoords.lng})`,
        southWestCoords: `(${southWestCoords.lat}, ${southWestCoords.lng})`,
      },
    });

    if (!response.ok) {
      return { isError: true };
    }

    const data = await response.json();

    return { isError: false, data };
  } catch (error) {
    console.log(error);
  }
};
