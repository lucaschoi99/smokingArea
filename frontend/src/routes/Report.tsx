import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isCoordsAvailableState, loggedInState } from "../atoms";
import CameraFlipBtn from "../components/CameraFlipBtn";
import CaptureBtn from "../components/CaptureBtn";

const Wrapper = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Camera = styled(Webcam)`
  width: 100%;
  flex-grow: 1;
  object-fit: cover;
`;

const CaptureBtnWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
`;

const FlipBtnWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  right: 10%;
  width: fit-content;
`;

const Report = () => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const isCoordsAvailable = useRecoilValue(isCoordsAvailableState);
  const cameraRef = useRef<Webcam>(null);
  const [isUserMode, setIsUserMode] = useState<boolean>(true);
  const navigate = useNavigate();

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
    // if (!isLoggedIn) return navigate("/login");

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
      <Camera
        ref={cameraRef}
        onUserMediaError={onUserMediaError}
        videoConstraints={{ facingMode: isUserMode ? "user" : "environment" }}
        mirrored={isUserMode}
      />
      <CaptureBtnWrapper>
        <CaptureBtn capture={capture} />
      </CaptureBtnWrapper>
      <FlipBtnWrapper>
        <CameraFlipBtn setIsUserMode={setIsUserMode} />
      </FlipBtnWrapper>
    </Wrapper>
  );
};

export default Report;
