import { ICoords, ISmokingAreaPreview } from "./atoms";

const API_URL = process.env.REACT_APP_API_URL;

const testMarkers = [
  {
    title: "test1",
    coords: { lat: 37.5644805, lng: 126.9784147 },
    id: "test1",
  },
  {
    title: "test2",
    coords: { lat: 37.5655805, lng: 126.9784147 },
    id: "test2",
  },
  {
    title: "test3",
    coords: { lat: 37.5666805, lng: 126.9784147 },
    id: "test3",
  },
];

export const fetchSmokingAreas = async (
  northEastCoords: ICoords,
  southWestCoords: ICoords
) => {
  try {
    return { isError: false, data: testMarkers };
    // const response = await fetch(`${API_URL}/markers/search`, {
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     northEastLat: northEastCoords.lat + "",
    //     northEastLng: northEastCoords.lng + "",
    //     southWestLat: southWestCoords.lat + "",
    //     southWestLng: southWestCoords.lng + "",
    //   },
    // });

    // if (!response.ok) {
    //   return { isError: true };
    // }

    // const data = (await response.json()) as ISmokingAreaPreview[];

    // return { isError: false, data };
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
