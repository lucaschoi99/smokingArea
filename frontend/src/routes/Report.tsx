import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isCoordsAvailableState, loggedInState } from "../atoms";

const Wrapper = styled.main`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Camera = styled(Webcam)``;

const CaptureBtn = styled.button`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Report = () => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const isCoordsAvailable = useRecoilValue(isCoordsAvailableState);
  const cameraRef = useRef<Webcam>(null);
  const navigate = useNavigate();

  const imgRef = useRef<HTMLImageElement>(null);

  const onUserMediaError = (error: string | DOMException) => {
    navigate("/");
  };

  const capture = () => {
    if (!!cameraRef?.current) {
      const imageSrc = cameraRef.current.getScreenshot();
    }
  };

  // 로그인, 위치 정보 동의 확인.
  useEffect(() => {
    if (!isLoggedIn) return navigate("/login");

    // 위치 정보 제공 동의하지 않은 경우
    if (!isCoordsAvailable) {
      // 위치 정보 제공 동의 구하기.
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          () => {},
          (error) => {
            // 동의하지 않았을 경우
            navigate("/");
          }
        );
      }
    }
  }, []);

  return (
    <Wrapper>
      <Camera ref={cameraRef} onUserMediaError={onUserMediaError} mirrored />
      <CaptureBtn onClick={capture}>Screen shot!</CaptureBtn>
    </Wrapper>
  );
};

export default Report;
