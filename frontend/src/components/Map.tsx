import { useRef } from "react";
import { Map as RawMap } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { mapCenterState } from "../atoms";
import MyLocationBtn from "./MyLocationBtn";

const KakaoMap = styled(RawMap)`
  width: 100%;
  flex-grow: 1;
  position: relative;
  z-index: 0;
`;

const MyLocationBtnWrapper = styled.div`
  position: absolute;
  bottom: 200px;
  right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

const Map = () => {
  const mapRef = useRef<kakao.maps.Map>(null);
  const mapCenter = useRecoilValue(mapCenterState);

  return (
    <KakaoMap ref={mapRef} center={mapCenter} level={3}>
      <MyLocationBtnWrapper>
        <MyLocationBtn />
      </MyLocationBtnWrapper>
    </KakaoMap>
  );
};

export default Map;
