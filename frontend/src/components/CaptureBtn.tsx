import styled from "styled-components";

const Button = styled.button`
  width: 70px;
  height: 70px;
  padding: 0;
  border-radius: 50%;

  border: none;
  background-color: white;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonInner = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid black;
`;

interface IProps {
  capture: () => any;
}

const CaptureBtn = ({ capture }: IProps) => {
  return (
    <Button onClick={capture}>
      <ButtonInner />
    </Button>
  );
};

export default CaptureBtn;
