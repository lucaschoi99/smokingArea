import { ICoords, ISmokingAreaDetail, ISmokingAreaPreview } from "./atoms";

const API_URL = process.env.REACT_APP_API_URL;

// const testMarkers: ISmokingAreaPreview[] = [
//   {
//     title: "test1",
//     coords: { lat: 37.5644805, lng: 126.9784147 },
//     id: 1,
//   },
//   {
//     title: "test2",
//     coords: { lat: 37.5655805, lng: 126.9784147 },
//     id: 2,
//   },
//   {
//     title: "test3",
//     coords: { lat: 37.5666805, lng: 126.9784147 },
//     id: 3,
//   },
// ];

interface IAreasPreviewData {
  title: string;
  id: number;
  xCoords: string;
  yCoords: string;
}

interface IAreasDetailData {
  title: string;
  id: number;
  xCoords: string;
  yCoords: string;
}

export const fetchSmokingAreas = async (
  northEastCoords: ICoords,
  southWestCoords: ICoords
) => {
  try {
    // test
    // return { isError: false, data: testMarkers };
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

    const json = (await response.json()) as IAreasPreviewData[];

    const data: ISmokingAreaPreview[] = json.map((el) => ({
      title: el.title,
      id: el.id,
      coords: {
        lat: Number(el.xCoords),
        lng: Number(el.yCoords),
      },
    }));

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

    const json = (await response.json()) as IAreasPreviewData;

    const data: ISmokingAreaPreview = {
      title: json.title,
      id: json.id,
      coords: {
        lat: Number(json.xCoords),
        lng: Number(json.yCoords),
      },
    };

    return { isError: false, data };
  } catch (error) {
    console.log(error);
    return { isError: true };
  }
};

export const fetchAreaDetail = async (id: number | undefined) => {
  if (!id) return { isError: true };
  try {
    const response = await fetch(`${API_URL}/markers/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return { isError: true };
    }

    const json = (await response.json()) as IAreasDetailData;

    const areaDetail: ISmokingAreaDetail = {
      title: json.title,
      id: json.id,
      coords: {
        lat: Number(json.xCoords),
        lng: Number(json.yCoords),
      },
    };

    return { isError: false, areaDetail };
  } catch (error) {
    console.log(error);
    return { isError: true };
  }
};
