import { ICoords, ISmokingAreaPreview } from "./atoms";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchSmokingAreas = async (
  northEastCoords: ICoords,
  southWestCoords: ICoords
) => {
  try {
    const response = await fetch(`${API_URL}/markers/search`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        northEastLat: northEastCoords.lat + "",
        northEastLng: northEastCoords.lng + "",
        southWestLat: southWestCoords.lat + "",
        southWestLng: southWestCoords.lng + "",
      },
    });

    if (!response.ok) {
      return { isError: true };
    }

    const data = (await response.json()) as ISmokingAreaPreview[];

    return { isError: false, data };
  } catch (error) {
    console.log(error);
    return { isError: true };
  }
};

export const fetchNearest = async (myCoords: ICoords) => {
  try {
    const response = await fetch(`${API_URL}/markers/nearest`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        myLat: myCoords.lat + "",
        myLng: myCoords.lng + "",
      },
    });

    if (!response.ok) {
      return { isError: true };
    }

    const data = (await response.json()) as ISmokingAreaPreview;

    return { isError: false, data };
  } catch (error) {
    console.log(error);
    return { isError: true };
  }
};
