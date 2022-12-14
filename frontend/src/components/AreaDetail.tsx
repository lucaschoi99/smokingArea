import { faArrowTrendUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchAreaDetail } from "../apis";
import { selectedState } from "../atoms";
import { ILocState } from "../routes/Navigate";

const Wrapper = styled(motion.div)`
  width: 90%;
  height: 100px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 6px;

  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const LeftColumn = styled.div``;

const RightColumn = styled.div``;

const Title = styled.h3`
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 5px;
`;

const StarsContainer = styled.div``;

const StarsGrade = styled.span``;

const StarsIcon = styled(FontAwesomeIcon)``;

const StarsNumber = styled.span``;

const Address = styled.span`
  font-size: 0.8em;
`;

const NavigateBtn = styled.button`
  width: 43px;
  height: 43px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.colors.kakaoBlue};
  color: ${(props) => props.theme.bgColor};
  padding: 9px;
  margin: 5px;
`;

const NavigateIcon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
`;

const AreaDetail = () => {
  const selectedArea = useRecoilValue(selectedState);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const { data } = useQuery(
    ["markerDetail", selectedArea?.id],
    () => fetchAreaDetail(selectedArea?.id),
    {
      enabled: !selectedArea,
    }
  );

  const onNavigateClick = () => {
    if (!selectedArea) return;
    const state: ILocState = {
      destinationCoords: selectedArea.coords,
      destinationName: selectedArea.title,
    };
    navigate("/navigate", { state });
  };

  useEffect(() => {
    if (!selectedArea) return;

    // ????????? ????????? ???????????? body??? ??????
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      selectedArea.coords.lng,
      selectedArea.coords.lat,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let addressStr = "";
          if (!result[0].road_address) {
            addressStr = `${result[0].address.address_name}`;
          } else {
            addressStr = `${result[0].road_address.address_name}`;
          }
          setAddress(addressStr);
        }
      }
    );
  }, [selectedArea]);

  return (
    <Wrapper
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <LeftColumn>
        <Title>{selectedArea?.title}</Title>
        {/* <StarsContainer>
          <StarsIcon icon={faStar} />
        </StarsContainer> */}
        <Address>{address}</Address>
      </LeftColumn>
      <RightColumn>
        <NavigateBtn onClick={onNavigateClick}>
          <NavigateIcon icon={faArrowTrendUp} />
        </NavigateBtn>
      </RightColumn>
    </Wrapper>
  );
};

export default AreaDetail;
