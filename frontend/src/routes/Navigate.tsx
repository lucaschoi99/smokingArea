import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchNearest } from "../apis";
import { ICoords, isCoordsAvailableState, myCoordsState } from "../atoms";

export interface ILocState {
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

  const redirectNewTab = (url: string) => {
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.target = "_blank";
    aTag.click();
  };

  // 위치 정보 사용 가능 확인
  useEffect(() => {
    if (isCoordsAvailable) {
      // 위치 정보 사용 가능
      const baseUrl = "https://map.kakao.com/link/to";
      if (!state) {
        // 가장 가까운 흡연구역을 찾아서 길안내.
        (async () => {
          const result = await fetchNearest(myCoords);
          if (!result.isError && !!result.data) {
            const {
              title,
              coords: { lat, lng },
            } = result.data;
            const finalUrl = `${baseUrl}/${title},${lat},${lng}`;
            redirectNewTab(finalUrl);
            navigate("/", { replace: true });
          }
        })();
      } else {
        // 유저가 선택한 흡연구역으로 길안내.
        const {
          destinationName,
          destinationCoords: { lat, lng },
        } = state;
        const finalUrl = `${baseUrl}/${destinationName},${lat},${lng}`;
        redirectNewTab(finalUrl);
        navigate("/", { replace: true });
      }
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
