import { Fragment, useContext } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion"; 
import { useSelector } from 'react-redux';
import OptionCard from './OptionCard';
import { isPropertySignature } from 'typescript';


interface OptionContainer {
  optionId: number;
}

const TestContainer = styled(motion.div)`
position: absolute;
width: 100%;
height: 750px;
background-color: #000000;
margin: auto;
border-top: 0.25rem solid #705DF2;
border-bottom: 0.25rem solid #705DF2;
display: flex;
.test__sidebar{
  border-left: 0.25rem solid #705DF2;
}
.option-flex-container{
  width: 100%;
  height: calc(100% - 14rem);
  background-color: gray;
  display: flex;
  flex-direction: row;
}
.test__sidebar {
  display: flex;
  flex-direction: column;
  background-color: #1b1b1b;
}
`;

const TestMainGuide = styled.div`
width: 574px;
background-color: #705DF2;
color: #1b1b1b;
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
font-size: 1.75rem;
padding: 0.25rem 1rem;
height: 5rem;
`;

const TestGuide = styled.div`
background-color: #1b1b1b;
color: #705DF2;
font-family: 'Roboto', sans-serif;
font-weight: 400;
font-size: 1.5rem;
font-style: italic;
padding: 0.25rem 0;
border-bottom: 0.25rem solid #705DF2;
height: 4rem;
text-align: center;
padding-top: 1rem;
`;

const Question = styled.div`
display: flex;
height: 5rem;
border-bottom: 0.25rem solid #705DF2;
.test__question-number {
  width: 10rem;
  background-color: #705DF2;
  color: #1b1b1b;
  font-size: 3.5rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  text-align: center;
}
.test__question{
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  width: calc(100%);
  background-color: #1b1b1b;
  color: #705DF2;
  font-size: 1.5rem;
  div {
    margin-left: 1rem;
  }
}
`;

const OptionCardContainer = styled.div<OptionContainer>`
border-left: ${(props) => props.optionId === 1 ?  "0.25rem solid #705DF2": 0};
flex: 1 1 auto;
height: 100%;
width: 50%;
.submitBtn {
  background-color: #705DF2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  div{
    color: #1b1b1b;
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    font-style: italic;
    font-size: 3rem;
  }
}
.backBtn {
  background-color: #1b1b1b;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  border-bottom: 0.25rem solid #705DF2;
  div{
    color: #705DF2;
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    font-style: italic;
    font-size: 1.75rem;
  }
}
`;

const SideCounterContainer = styled.div`
width: 34px;
height: 2rem;
background-color: #1b1b1b;
display: flex;
justify-content: center;
align-items: center;
div {
  font-size: 1.5rem;
  color: #705DF2;
}
`;

const SideCounterContainerChecked = styled.div`
width: 34px;
height: 2rem;
background-color: #705DF2;
display: flex;
justify-content: center;
align-items: center;
div {
  font-size: 1.5rem;
  color: #1b1b1b;
}
`;

const containerVariants: any = {
  hidden: {
    // opacity: 0,
    y: "-100vh"
  },
  visible: {
    // opacity: 1,
    y: "0",
    transition: { delay: 0.25, duration: 1 },
  },
  exit: {
    y: "100vh",
    transition: { ease: "easeInOut" },
  },
}

interface TestProps {
  question: any;
  handleOptionClick: (e: any) => any;
  handlePreviousButtonClick: (e: any) => any;
  handleSubmitButtonClick: (e: any) => any;
  currentTest: number;
}

function SidebarCounter() {
  return (
    <SideCounterContainer>
      <div>▼</div>
    </SideCounterContainer>
  )
}

function SidebarCounterChecked() {
  return (
    <SideCounterContainerChecked>
      <div>▼</div>
    </SideCounterContainerChecked>
  )
}

function Test({question, currentTest, handleOptionClick, handlePreviousButtonClick, handleSubmitButtonClick}: TestProps) {
  let arrForCounter = new Array(20 - currentTest).fill(0); 
  let arrForCounterChecked = new Array(currentTest).fill(0);

  return (
    <TestContainer variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <div className="test__main">
      <TestMainGuide>Now then, <br/> answer the twenty questions below, plz :)</TestMainGuide>
      <TestGuide>Choose one option which describes you better</TestGuide>
      <Question>
        <div className="test__question-number">Q{question.number}</div>
        <div className="test__question">
          <div>{question.question}</div>
        </div>
      </Question>
      <div className="option-flex-container">
        <OptionCardContainer optionId={0}>
        <div className="backBtn" onClick={handlePreviousButtonClick}>
          <div>◀ Previous Question</div>
          </div>
          <OptionCard num={1} pic={question.pic1} option={question.option1} handleOptionClick={handleOptionClick}/>
        </OptionCardContainer>
        <OptionCardContainer optionId={1}>
          <OptionCard num={2} pic={question.pic2} option={question.option2} handleOptionClick={handleOptionClick}/>
          <div className="submitBtn" onClick={handleSubmitButtonClick}>
            <div>▶ SUBMIT</div>
          </div>
        </OptionCardContainer>
      </div>
      </div>
      <div className="test__sidebar">
        {arrForCounterChecked.map((item) => <SidebarCounterChecked/>)}
        {arrForCounter.map((item) => <SidebarCounter/>)}
      </div>
    </TestContainer>
  )
}

export default Test;