import { useRef } from "react";
import { Map as RawMap } from "react-kakao-maps-sdk";
import styled from "styled-components";

const KakaoMap = styled(RawMap)`
  width: 100%;
  flex-grow: 1;
`;

const Map = () => {
  const mapRef = useRef<kakao.maps.Map>(null);

  return (
    <KakaoMap
      center={{ lat: 37.5666805, lng: 126.9784147 }} // 서울시청 좌표
      level={3}
      ref={mapRef}
    ></KakaoMap>
  );
};

export default Map;
