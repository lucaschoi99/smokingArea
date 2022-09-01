import { Map } from "react-kakao-maps-sdk";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const KakaoMap = styled(Map)`
  width: 100%;
  flex-grow: 1;
`;

const Home = () => {
  return (
    <Wrapper>
      <KakaoMap center={{ lat: 36.2683, lng: 127.6358 }} level={10}></KakaoMap>
    </Wrapper>
  );
};

export default Home;
