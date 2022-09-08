import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../atoms";

const User = () => {
  const isLoggedIn = useRecoilValue(loggedInState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return navigate("/login", { replace: true });
  }, []);

  return null;
};

export default User;
