import { useEffect, useState } from "react";
import { Map as RawMap, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  boundsChangedState,
  isCoordsAvailableState,
  ISmokingAreaPreview,
  mapCenterState,
  mapNorthEastState,
  mapSouthWestState,
  myCoordsState,
  selectedState,
  smokingAreasState,
} from "../atoms";
import MyLocationBtn from "./MyLocationBtn";
import myMarker from "../images/myMarker.svg";
import marker from "../images/marker.svg";
import dotMarker from "../images/dotMarker.svg";
import NavBar from "./NavBar";
import ReSearchBtn from "./ReSearchBtn";
import { fetchSmokingAreas } from "../apis";
import AreaDetail from "./AreaDetail";
import { AnimatePresence } from "framer-motion";

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

const TopNavWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Map = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [mapCenter, setMapcenter] = useRecoilState(mapCenterState);
  const [isBoundsChanged, setIsBoundsChanged] =
    useRecoilState(boundsChangedState);
  const [smokingAreas, setSmokingAreas] = useRecoilState(smokingAreasState);
  const [selectedMarker, setSelectedMarker] = useRecoilState(selectedState);
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

  const onMarkerClick = (area: ISmokingAreaPreview) => {
    setSelectedMarker(area);
    setMapcenter(area.coords);
  };

  // default ???????????? smoking area??? fetch.
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

  // ??? ????????? ?????? ??? Bounds??? ?????????.
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
      isPanto={true}
      level={3}
      onDragEnd={onMapDragEnd}
      onBoundsChanged={onMapBoundsChanged}
      onClick={() => setSelectedMarker(null)}
    >
      {isCoordsAvailable && ( // MyMarker
        <MapMarker
          position={myCoords}
          image={{
            src: myMarker, // ?????????????????? ???????????????
            size: {
              width: 30,
              height: 30,
            }, // ?????????????????? ???????????????
            options: {
              offset: {
                x: 15,
                y: 15,
              }, // ?????????????????? ???????????????. ????????? ????????? ???????????? ????????? ???????????? ????????? ???????????????.
            },
          }}
        />
      )}
      {smokingAreas.map((area) => (
        <MapMarker
          key={area.id}
          position={area.coords} // ????????? ????????? ??????
          title={area.title} // ????????? ?????????, ????????? ???????????? ????????? ???????????? ???????????????
          onClick={() => onMarkerClick(area)}
          image={{
            src: selectedMarker?.id === area.id ? dotMarker : marker,
            size: {
              width: selectedMarker?.id === area.id ? 40 : 25,
              height: selectedMarker?.id === area.id ? 40 : 25,
            },
          }}
        />
      ))}
      <TopNavWrapper>
        <AnimatePresence>{!!selectedMarker && <AreaDetail />}</AnimatePresence>
        {isBoundsChanged && <ReSearchBtn />}
      </TopNavWrapper>
      <NavBarWrapper>
        <NavBar />
      </NavBarWrapper>
      <MyLocationBtnWrapper>
        <MyLocationBtn />
      </MyLocationBtnWrapper>
    </KakaoMap>
  );
};

export default Map;
