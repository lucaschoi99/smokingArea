import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  boundsChangedState,
  isCoordsAvailableState,
  mapCenterState,
  myCoordsState,
} from "../atoms";

const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 13px;
  border-radius: 50%;

  border: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 9px 0px;

  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.colors.kakaoBlue};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyLocationBtn = () => {
  const [myCoords, setMyCoords] = useRecoilState(myCoordsState);
  const setIsCoordsAvailable = useSetRecoilState(isCoordsAvailableState);
  const setMapCenter = useSetRecoilState(mapCenterState);
  const setIsBoundsChanged = useSetRecoilState(boundsChangedState);

  const onClick = () => {
    if (!myCoords) {
      // 현재 유저의 현재 위치를 watch중이지 않음.
      if ("geolocation" in navigator) {
        /* 위치정보 사용 가능 */
        // 유저의 현재 위치를 watch.
        navigator.geolocation.watchPosition((position) => {
          const { latitude, longitude } = position.coords;
          setMyCoords({ lat: latitude, lng: longitude });
          setIsCoordsAvailable(true);
        });
        // 현재 위치로 지도를 이동
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setIsBoundsChanged(true);
        });
      } else {
        /* 위치정보 사용 불가능 */
      }
    } else {
      // 현재 유저의 현재 위치를 watch중임.
      // 현재 위치로 지도를 이동
      setMapCenter(myCoords);
      setIsBoundsChanged(true);
    }
  };

  return (
    <Button onClick={onClick}>
      <Icon icon={faLocationCrosshairs} />
    </Button>
  );
};

export default MyLocationBtn;
