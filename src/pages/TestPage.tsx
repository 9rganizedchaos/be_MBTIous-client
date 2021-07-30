import { Fragment } from 'react';
import {withRouter} from "react-router";
import Test from "../components/Test";
import styled from "styled-components";
import questionArr from "../assets/questions"
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const TestpageContainer = styled(motion.div)`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-itmes: center;
`;

const Mybutton = styled.button`
height: 100vh;
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

function TestPage() {
  const [currentTest, setCurrentTest] = useState(1);
  const [answers, setAnswers] = useState(
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  )

  const handleOptionClick = (e: any) => {
    console.log(answers);
    console.log(currentTest);
    console.log(e.target.className);
    let newAnswers = answers.slice();
    newAnswers.splice(currentTest - 1, 1, Number(e.target.className))
    setAnswers(newAnswers)
    setCurrentTest(currentTest + 1);
  }

  const handleMyButtonClick = () => {
    let result = ""
    let EI = answers.filter((item, index) => index % 4 === 0).reduce((acc, cur) => {return acc + cur}, 0)
    let NS = answers.filter((item, index) => index % 4 === 1).reduce((acc, cur) => {return acc + cur}, 0)
    let TF = answers.filter((item, index) => index % 4 === 2).reduce((acc, cur) => {return acc + cur}, 0)
    let JP = answers.filter((item, index) => index % 4 === 3).reduce((acc, cur) => {return acc + cur}, 0)
    if(EI > 2){
      result = result + "E"
    } else {
      result = result + "I"
    }
    if(NS > 2){
      result = result + "N"
    } else {
      result = result + "S"
    }
    if(TF > 2){
      result = result + "T"
    } else {
      result = result + "F"
    }
    if(JP > 2){
      result = result + "J"
    } else {
      result = result + "P"
    }
    alert(result)
  }

  return (
    <TestpageContainer variants={containerVariants} exit="exit">
      <button onClick={() => {
        setCurrentTest(currentTest - 1)
      }}>버튼</button>
      <AnimatePresence>
      {currentTest > 20 ? null : questionArr.filter((item, index) => index === currentTest - 1).map((question) => 
      <Test question={question} goToNextQuestion={handleOptionClick} key={question.question}/>
      )}</AnimatePresence>
      <Mybutton onClick={handleMyButtonClick}>나는 버튼</Mybutton>
    </TestpageContainer>
  )
}

export default withRouter(TestPage);