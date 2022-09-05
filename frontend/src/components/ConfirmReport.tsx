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

  const onSend = () => {};

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
