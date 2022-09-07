import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isCoordsAvailableState, loggedInState, myCoordsState } from "../atoms";
import CameraFlipBtn from "../components/CameraFlipBtn";
import CaptureBtn from "../components/CaptureBtn";
import ConfirmReport from "../components/ConfirmReport";

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
  object-fit: contain;
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

const BackBtn = styled.button`
  background-color: #212121;
  color: white;
  border: none;
  position: absolute;
  top: 40px;
  left: 10%;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 14px;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
`;

const Report = () => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const [isCoordsAvailable, setIsCoordsAvailable] = useRecoilState(
    isCoordsAvailableState
  );
  const setMyCoords = useSetRecoilState(myCoordsState);
  const cameraRef = useRef<Webcam>(null);
  const [isUserMode, setIsUserMode] = useState<boolean>(true);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [capturedSrc, setCapturedSrc] = useState<string>("");
  const navigate = useNavigate();

  const onUserMediaError = (error: string | DOMException) => {
    navigate("/");
  };

  const capture = () => {
    if (!!cameraRef?.current) {
      const imageSrc = cameraRef.current.getScreenshot();
      if (!!imageSrc) {
        setCapturedSrc(imageSrc);
        setIsCaptured(true);
      }
    }
  };

  const onBackBtnClick = () => {
    navigate(-1);
  };

  // 로그인, 위치 정보 동의 확인.
  useEffect(() => {
    // if (!isLoggedIn) return navigate("/login");

    // 위치 정보 제공 동의하지 않은 경우
    if (!isCoordsAvailable) {
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
  }, []);

  return (
    <Wrapper>
      <Camera
        ref={cameraRef}
        onUserMediaError={onUserMediaError}
        videoConstraints={{ facingMode: isUserMode ? "user" : "environment" }}
        mirrored={isUserMode}
        screenshotFormat={"image/jpeg"}
      />
      <BackBtn onClick={onBackBtnClick}>
        <Icon icon={faArrowLeft} />
      </BackBtn>
      <CaptureBtnWrapper>
        <CaptureBtn capture={capture} />
      </CaptureBtnWrapper>
      <FlipBtnWrapper>
        <CameraFlipBtn setIsUserMode={setIsUserMode} />
      </FlipBtnWrapper>
      <AnimatePresence>
        {isCaptured && (
          <ConfirmReport
            capturedSrc={capturedSrc}
            setIsCaptured={setIsCaptured}
          />
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Report;
