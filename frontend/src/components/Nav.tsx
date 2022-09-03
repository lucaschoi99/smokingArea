import {
  faTriangleExclamation,
  faCircleUser,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Item = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  margin-bottom: 3px;
`;

const Text = styled.h3`
  font-size: 0.5em;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
`;

const Nav = () => {
  return (
    <Wrapper>
      <Item key="report">
        <Icon icon={faTriangleExclamation} />
        <Text>신고하기</Text>
      </Item>
      <Item key="user">
        <Icon icon={faCircleUser} />
        <Text>마이페이지</Text>
      </Item>
      <Item key="navigate">
        <Icon icon={faArrowTrendUp} />
        <Text>바로안내</Text>
      </Item>
      <Item key="bookmark">
        <Icon icon={faStar} />
        <Text>즐겨찾기</Text>
      </Item>
    </Wrapper>
  );
};

export default Nav;
