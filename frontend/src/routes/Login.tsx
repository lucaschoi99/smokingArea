import styled from "styled-components";
import Kakao from "../images/kakao_logo.svg";

const Background = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.main`
  padding: 50px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Social = styled.a`
  max-width: 343px;
  width: 80vw;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SocialLeft = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialRight = styled.div`
  width: calc(100% - 50px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialLogo = styled.img`
  width: 100%;
  height: 100%;
`;

const SocialText = styled.h3`
  transform: translateX(-25px);
`;

const SocialKakao = styled(Social)`
  background-color: #fee500;

  ${SocialRight} {
    color: black;
  }

  ${SocialLogo} {
    width: 60%;
    height: 60%;
  }

  ${SocialText} {
    color: black;
  }
`;

const Login = () => {
  return (
    <Background>
      <Wrapper>
        <SocialKakao
          href={`${process.env.REACT_APP_API_URL}/user/social/kakao/start`}
        >
          <SocialLeft>
            <SocialLogo
              src={Kakao}
              // 출처: https://www.svgrepo.com/svg/368252/kakao
            ></SocialLogo>
          </SocialLeft>
          <SocialRight>
            <SocialText>카카오로 로그인</SocialText>
          </SocialRight>
        </SocialKakao>
      </Wrapper>
    </Background>
  );
};

export default Login;
