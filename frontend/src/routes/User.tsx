import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInState } from "../atoms";

const Wrapper = styled.div`
  flex-grow: 1;
  position: relative;
`;

const Header = styled.header`
  padding: 10px;
`;

const BackBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
`;

const BackIcon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
`;

const User = () => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return navigate("/login", { replace: true });
  }, []);

  return (
    <Wrapper>
      <Header>
        <BackBtn>
          <BackIcon icon={faChevronLeft} />
        </BackBtn>
      </Header>
    </Wrapper>
  );
};

export default User;
