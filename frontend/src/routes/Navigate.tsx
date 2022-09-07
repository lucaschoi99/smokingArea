import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ICoords, isCoordsAvailableState, myCoordsState } from "../atoms";

interface ILocState {
  destinationCoords: ICoords;
  destinationName: string;
}

const Navigate = () => {
  const [isCoordsAvailable, setIsCoordsAvailable] = useRecoilState(
    isCoordsAvailableState
  );
  const [myCoords, setMyCoords] = useRecoilState(myCoordsState);
  const state = useLocation().state as ILocState | null;
  const navigate = useNavigate();

  // 위치 정보 사용 가능 확인
  useEffect(() => {
    if (isCoordsAvailable) {
      // 위치 정보 사용 가능
      const baseUrl = "https://map.kakao.com/link/to";
      let destinationName = "";
      let destinationLat = 0;
      let destinationLng = 0;
      if (!state) {
        // 가장 가까운 흡연구역을 찾아서 길안내.
      } else {
        // 유저가 선택한 흡연구역으로 길안내.
        destinationName = state.destinationName;
        destinationLat = state.destinationCoords.lat;
        destinationLng = state.destinationCoords.lng;
      }
      const finalUrl = `${baseUrl}/${destinationName},${destinationLat},${destinationLng}`;
      const aTag = document.createElement("a");
      aTag.href = finalUrl;
      aTag.target = "_blank";
      aTag.click();
      navigate("/", { replace: true });
    } else {
      // 위치 정보 제공 동의하지 않은 경우
      // 위치 정보 제공 동의 구하기.
      if ("geolocation" in navigator) {
        // 유저의 현재 위치를 watch.
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMyCoords({ lat: latitude, lng: longitude });
            setIsCoordsAvailable(true);
          },
          (error) => {
            // 동의하지 않았을 경우
            navigate("/");
          }
        );
      } else {
        /* 위치정보 사용 불가능 */
        navigate("/");
      }
    }
  }, [isCoordsAvailable]);

  return null;
};

export default Navigate;
