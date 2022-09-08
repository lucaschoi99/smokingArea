import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchSmokingAreas } from "../apis";
import {
  boundsChangedState,
  mapNorthEastState,
  mapSouthWestState,
  smokingAreasState,
} from "../atoms";

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: white;
  border: none;
  border-radius: calc((1em + 12px) / 2);
  padding: 6px 12px;
  color: ${(props) => props.theme.colors.kakaoBlue};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 7px 0px;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const Text = styled.h3`
  font-size: 1em;
  font-weight: 400;
`;

const ReSearchBtn = () => {
  const setIsBoundsChanged = useSetRecoilState(boundsChangedState);
  const setSmokingAreas = useSetRecoilState(smokingAreasState);
  const northEastCoords = useRecoilValue(mapNorthEastState);
  const southWestCoords = useRecoilValue(mapSouthWestState);
  const onClick = async () => {
    const result = await fetchSmokingAreas(northEastCoords, southWestCoords);
    if (!result.isError && !!result?.data) {
      setSmokingAreas(result.data);
      setIsBoundsChanged(false);
    }
  };
  return (
    <Button onClick={onClick}>
      <Icon icon={faArrowRotateRight} />
      <Text>이 지역 재검색</Text>
    </Button>
  );
};

export default ReSearchBtn;
