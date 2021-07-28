import { Fragment } from "react";
import styled from "styled-components";
import OptionCard from './OptionCard';
import { motion } from "framer-motion"; 

const TestContainer = styled(motion.div)`
position: absolute;
width: 700px;
height: 80vh;
display: grid;
grid-template-columns: repeat(2, 1fr);
grid-template-rows: 1fr 7fr;
grid-gap: 10px;
background-color: pink;
margin: auto;
`;

const Question = styled.div`
grid-column: 1 / span 2;
grid-row: 1 / span 1;
display: flex;
justify-content: center;
align-items: center;
`;

const containerVariants: any = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1.5, duration: 1.5 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
}

function Test(props: any) {
  return (
    <TestContainer variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <Question>누군가를 처음 만나면 나는!?</Question>
      <OptionCard/>
      <OptionCard/>
    </TestContainer>
  )
}

export default Test;