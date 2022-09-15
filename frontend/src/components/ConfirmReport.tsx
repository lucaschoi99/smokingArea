import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.aside)`
  position: fixed;
  top: 0;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  margin: 0 auto;

  min-height: 100vh;
  min-height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: fill-available;

  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 20px 10px;
`;

const CancelBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px;
  width: 35px;
  height: 35px;

  margin-right: calc(50% - 35px);
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 1.1em;
  font-weight: 600;
  transform: translateX(-50%);
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  flex-grow: 1;
  object-fit: contain;
  background-color: black;
`;

const NoticeText = styled.p`
  text-align: center;
  padding: 15px 0;
  font-size: 0.8em;
  font-weight: 300;
`;

const Footer = styled.footer`
  padding: 20px 10px;
`;

const SendBtn = styled.button`
  width: 100%;
  font-size: 1em;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #ff4a4a;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
`;

interface IProps {
  capturedSrc: string;
  setIsCaptured: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmReport = ({ capturedSrc, setIsCaptured }: IProps) => {
  const onCancel = () => {
    setIsCaptured(false);
  };

  // const checkMobile = () => {
  //   const varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기

  //   if (varUA.indexOf("android") > -1) {
  //     // 안드로이드
  //     return "android";
  //   } else if (
  //     varUA.indexOf("iphone") > -1 ||
  //     varUA.indexOf("ipad") > -1 ||
  //     varUA.indexOf("ipod") > -1 ||
  //     varUA.indexOf("ios") > -1
  //   ) {
  //     // IOS
  //     return "ios";
  //   } else {
  //     // IOS, 안드로이드 외
  //     return "other";
  //   }
  // };

  const onSend = async () => {
    // const userOS = checkMobile();
    // const seperator = userOS === "ios" ? "&" : "?";
    // const seperator = "&";
    // const number = "01072406596"; // 최민수
    // const number = "01039548009";  // 윤태호
    // const number = "01064390213";  // 이지흠
    // const number = "01067007241"; // 송동준
    // const iuImage =
    //   "https://cphoto.asiae.co.kr/listimglink/6/2022062016015219931_1655708512.jpg";
    // const href = `sms:${number}${seperator}body=${capturedSrc}`;
    // const href = `sms:${number}?&body=${capturedSrc}`;
    // const href = `mailto:pln0302@yonsei.ac.kr?&body=${capturedSrc}`;
    // const href = `mms:${number}?&body=hello`;
    const aTag = document.createElement("a");
    const href = capturedSrc;
    aTag.href = href;
    aTag.download = "report.jpeg";
    console.log(aTag);
    aTag.click();
  };

  return (
    <Wrapper
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "100vh" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Header>
        <CancelBtn onClick={onCancel}>
          <Icon icon={faXmark} />
        </CancelBtn>
        <Title>신고하기</Title>
      </Header>
      <Main>
        <Image src={capturedSrc} />
        <NoticeText>
          ❗️ 위 사진은 당신의 현재 위치 정보와 함께 가까운 보건소로 신고됩니다.
        </NoticeText>
      </Main>
      <Footer>
        <SendBtn onClick={onSend}>신고하기</SendBtn>
      </Footer>
    </Wrapper>
  );
};

export default ConfirmReport;
