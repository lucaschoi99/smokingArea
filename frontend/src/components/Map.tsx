import { useEffect, useState } from "react";
import { Map as RawMap, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  boundsChangedState,
  isCoordsAvailableState,
  mapCenterState,
  mapNorthEastState,
  mapSouthWestState,
  myCoordsState,
  smokingAreasState,
} from "../atoms";
import MyLocationBtn from "./MyLocationBtn";
import myMarker from "../images/myMarker.svg";
import NavBar from "./NavBar";
import ReSearchBtn from "./ReSearchBtn";
import { fetchSmokingAreas } from "../apis";

const KakaoMap = styled(RawMap)`
  width: 100%;
  flex-grow: 1;
  position: relative;
  z-index: 0;
`;

const NavBarWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 90%;
`;

const MyLocationBtnWrapper = styled.div`
  position: absolute;
  bottom: 120px;
  right: 5%;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const ReSearchBtnWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
`;

const Map = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [mapCenter, setMapcenter] = useRecoilState(mapCenterState);
  const [isBoundsChanged, setIsBoundsChanged] =
    useRecoilState(boundsChangedState);
  const [smokingAreas, setSmokingAreas] = useRecoilState(smokingAreasState);
  const isCoordsAvailable = useRecoilValue(isCoordsAvailableState);
  const myCoords = useRecoilValue(myCoordsState);
  const setNorthEastCoords = useSetRecoilState(mapNorthEastState);
  const setSouthWestCoords = useSetRecoilState(mapSouthWestState);

  const onMapDragEnd = (map: kakao.maps.Map) => {
    setMapcenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };

  const getBoundsCoords = (map: kakao.maps.Map) => {
    const northEast = map.getBounds().getNorthEast();
    const southWest = map.getBounds().getSouthWest();
    const northEastCoords = {
      lat: northEast.getLat(),
      lng: northEast.getLng(),
    };
    const southWestCoords = {
      lat: southWest.getLat(),
      lng: southWest.getLng(),
    };
    return {
      northEastCoords,
      southWestCoords,
    };
  };

  const onMapBoundsChanged = (map: kakao.maps.Map) => {
    const { northEastCoords, southWestCoords } = getBoundsCoords(map);
    setNorthEastCoords(northEastCoords);
    setSouthWestCoords(southWestCoords);
    setIsBoundsChanged(true);
  };

  // default 위치에서 smoking area를 fetch.
  useEffect(() => {
    if (!!map) {
      const { northEastCoords, southWestCoords } = getBoundsCoords(map);
      (async () => {
        const result = await fetchSmokingAreas(
          northEastCoords,
          southWestCoords
        );
        if (!result.isError && !!result?.data) {
          setSmokingAreas(result.data);
        }
      })();
    }
  }, [map]);

  // 맵 중심이 바뀔 때 Bounds를 재설정.
  useEffect(() => {
    if (!!map) {
      const { northEastCoords, southWestCoords } = getBoundsCoords(map);
      setNorthEastCoords(northEastCoords);
      setSouthWestCoords(southWestCoords);
    }
  }, [map, mapCenter]);

  return (
    <KakaoMap
      ref={setMap}
      center={mapCenter}
      level={3}
      onDragEnd={onMapDragEnd}
      onBoundsChanged={onMapBoundsChanged}
    >
      {isCoordsAvailable && ( // MyMarker
        <MapMarker
          position={myCoords}
          image={{
            src: myMarker, // 마커이미지의 주소입니다
            size: {
              width: 30,
              height: 30,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 15,
                y: 15,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
        />
      )}
      {smokingAreas.map((area) => (
        <MapMarker
          key={area.id}
          position={area.coords} // 마커를 표시할 위치
          title={area.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        />
      ))}
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
      <MyLocationBtnWrapper>
        <MyLocationBtn />
      </MyLocationBtnWrapper>
      {isBoundsChanged && (
        <ReSearchBtnWrapper>
          <ReSearchBtn />
        </ReSearchBtnWrapper>
      )}
    </KakaoMap>
  );
};

export default Map;
