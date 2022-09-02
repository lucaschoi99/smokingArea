import styled from "styled-components";
import Map from "../components/Map";

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
};

export default Home;
