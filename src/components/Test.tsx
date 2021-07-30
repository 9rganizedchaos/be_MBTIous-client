import { Fragment, useContext } from "react";
import styled from "styled-components";
import OptionCard from './OptionCard';
import { AnimatePresence, motion } from "framer-motion"; 
import { useSelector } from 'react-redux';

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
    transition: { delay: 0.25, duration: 1 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
}

interface TestProps {
  question: any;
  goToNextQuestion: (e: any) => any;
}

function Test({question, goToNextQuestion}: TestProps) {
  return (
    <TestContainer variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <Question onClick={() => {console.log("clicked!")}}>{question.question}</Question>
      <OptionCard id={0} onClick={goToNextQuestion} goToNextQuestion={goToNextQuestion} option={question.option1} image={question.pic1}/>
      <OptionCard id={1} onClick={goToNextQuestion} goToNextQuestion={goToNextQuestion} option={question.option2} image={question.pic2}/>
    </TestContainer>
  )
}

export default Test;