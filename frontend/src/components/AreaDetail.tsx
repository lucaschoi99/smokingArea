import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  width: 90%;
  height: 100px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 5px;
`;

const AreaDetail = () => {
  return (
    <Wrapper
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    ></Wrapper>
  );
};

export default AreaDetail;
