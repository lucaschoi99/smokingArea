import { useRef } from "react";
import { Map as RawMap, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { mapCenterState, myCoordsState } from "../atoms";
import MyLocationBtn from "./MyLocationBtn";
import myMarker from "../images/myMarker.svg";

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
  const myCoords = useRecoilValue(myCoordsState);

  return (
    <KakaoMap ref={mapRef} center={mapCenter} level={3}>
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
      <MyLocationBtnWrapper>
        <MyLocationBtn />
      </MyLocationBtnWrapper>
    </KakaoMap>
  );
};

export default Map;
