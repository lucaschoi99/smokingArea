import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 50px;
  height: 50px;
  padding: 15px;
  border-radius: 50%;

  border: none;
  background-color: #212121;
  color: white;

  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
`;

interface IProps {
  setIsUserMode: Dispatch<SetStateAction<boolean>>;
}

const CameraFlipBtn = ({ setIsUserMode }: IProps) => {
  const onClick = () => {
    setIsUserMode((current) => !current);
  };
  return (
    <Button onClick={onClick}>
      <Icon icon={faRepeat} />
    </Button>
  );
};

export default CameraFlipBtn;
