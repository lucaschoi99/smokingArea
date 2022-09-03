import { useEffect, useRef, useState } from "react";
import { Map as RawMap, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  boundsChangedState,
  mapCenterState,
  mapNorthEastState,
  mapSouthWestState,
  myCoordsState,
} from "../atoms";
import MyLocationBtn from "./MyLocationBtn";
import myMarker from "../images/myMarker.svg";
import Nav from "./Nav";
import ReSearchBtn from "./ReSearchBtn";
import { fetchSmokingAreas } from "../apis";

const KakaoMap = styled(RawMap)`
  width: 100%;
  flex-grow: 1;
  position: relative;
  z-index: 0;
`;

const NavWrapper = styled.div`
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
  const myCoords = useRecoilValue(myCoordsState);

  const [isBoundsChanged, setIsBoundsChanged] =
    useRecoilState(boundsChangedState);
  const setNorthEastCoords = useSetRecoilState(mapNorthEastState);
  const setSouthWestCoords = useSetRecoilState(mapSouthWestState);

  const onMapDragEnd = (map: kakao.maps.Map) => {
    setMapcenter({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    });
  };

  const onMapBoundsChanged = (map: kakao.maps.Map) => {
    const northEast = map.getBounds().getNorthEast();
    const southWest = map.getBounds().getSouthWest();
    setNorthEastCoords({
      lat: northEast.getLat(),
      lng: northEast.getLng(),
    });
    setSouthWestCoords({
      lat: southWest.getLat(),
      lng: southWest.getLng(),
    });
    setIsBoundsChanged(true);
  };

  useEffect(() => {
    if (map) {
      const northEast = map.getBounds().getNorthEast();
      const southWest = map.getBounds().getSouthWest();
      // fetchSmokingAreas(
      //   {
      //     lat: northEast.getLat(),
      //     lng: northEast.getLng(),
      //   },
      //   { lat: southWest.getLat(), lng: southWest.getLng() }
      // );
    }
  }, [map]);

  return (
    <KakaoMap
      ref={setMap}
      center={mapCenter}
      level={3}
      onDragEnd={onMapDragEnd}
      onBoundsChanged={onMapBoundsChanged}
    >
      {!!myCoords && ( // MyMarker
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
      <NavWrapper>
        <Nav />
      </NavWrapper>
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
