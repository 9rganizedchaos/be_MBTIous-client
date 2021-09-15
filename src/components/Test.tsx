import styled, { css } from "styled-components";
import { motion } from "framer-motion"; 
import OptionCard from './OptionCard';
import TestAlert from './TestAlert';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';


interface OptionContainer {
  optionId: number;
}

const TestContainer = styled(motion.div)`
${( { theme } ) => {
  return css`
position: absolute;
width: 100%;
height: 750px;
background-color: #000000;
margin: auto;
border-top: 0.25rem solid ${theme.color.main};
border-bottom: 0.25rem solid ${theme.color.main};
display: flex;
.test__sidebar{
  border-left: 0.25rem solid ${theme.color.main};
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
  background-color: ${theme.color.sub};
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  position: relative;
  height: 550px;
  margin-bottom: 40%; 
  .option-flex-container{
    height: calc(100% - 9rem);
  }
}
`
}}
`;

const TestMainGuide = styled.div`
${( { theme } ) => {
  return css`
width: 574px;
background-color: ${theme.color.main};
color: ${theme.color.sub};
font-weight: 800;
font-style: italic;
font-size: 1.75rem;
padding: 0.25rem 1rem;
height: 5rem;
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  height: 3.5rem;
}
`
}}
`;

const TestGuide = styled.div`
${( { theme } ) => {
  return css`
background-color: ${theme.color.sub};
color: ${theme.color.main};
font-weight: 400;
font-size: 1.5rem;
font-style: italic;
padding: 0.25rem 0;
border-bottom: 0.25rem solid ${theme.color.main};
height: 4rem;
text-align: center;
padding-top: 1rem;
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  padding: 0.5rem 0;
  font-size: 1rem;
  height: 2.25rem;
}
`
}}
`;

const Question = styled.div`
${( { theme } ) => {
  return css`
display: flex;
height: 5rem;
border-bottom: 0.25rem solid ${theme.color.main};
.test__question-number {
  width: 10rem;
  background-color: ${theme.color.main};
  color: ${theme.color.sub};
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.test__question{
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 400;
  width: calc(100%);
  background-color: ${theme.color.sub};
  color: ${theme.color.main};
  font-size: 1.5rem;
  div {
    margin: 0 0.5rem;
  }
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  height: 3.25rem;
  width: calc(100vw - 2.125rem);
  .test__question-number {
    width: 7.5rem;
    font-size: 2.25rem;
  }
  .test__question{
    font-size: 1rem;
    div {
      margin-left: 1rem;
    }
}
`
}}
`;

const OptionCardContainer = styled.div<OptionContainer>`
${( { theme, optionId } ) => {
  return css`
border-left: ${optionId === 1 ?  `0.25rem solid ${theme.color.main}`: 0};
flex: 1 1 auto;
height: 100%;
width: 50%;
.submitBtn {
  cursor: pointer;
  background-color: ${theme.color.main};
  color: ${theme.color.sub};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  transition: .5s;
  div{
    font-weight: 800;
    font-style: italic;
    font-size: 3rem;
  }
  &:hover {
    background-color: ${theme.color.sub};
    color: ${theme.color.main};
    border-top: 0.25rem solid ${theme.color.main};
  }
}
.backBtn {
  cursor: pointer;
  background-color: ${theme.color.sub};
  color: ${theme.color.main};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  border-bottom: 0.25rem solid ${theme.color.main};
  transition: .5s;
  div{
    font-weight: 800;
    font-style: italic;
    font-size: 1.75rem;
  }
  &:hover {
    background-color: ${theme.color.main};
    color: ${theme.color.sub};
  }
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  .submitBtn {
    height: 4rem;
    div{
      font-size: 2rem;
    }
  }
  .backBtn {
    height: 4rem;
    div{
      font-size: 1.125rem;
    }
  }
}
`
}}
`;

const SideCounterContainer = styled.div`
${( { theme } ) => {
  return css`
width: 34px;
height: 3rem;
background-color: ${theme.color.sub};
display: flex;
justify-content: center;
align-items: center;
div {
  font-size: 1.5rem;
  color: ${theme.color.main};
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  width: 22px;
  height: 2.9rem;
  div{
    font-size: 1rem;
  }
}
`
}}
`;

const SideCounterContainerChecked = styled.div`
${( { theme } ) => {
  return css`
width: 34px;
height: 3rem;
background-color: ${theme.color.main};
display: flex;
justify-content: center;
align-items: center;
div {
  font-size: 1.7rem;
  color: ${theme.color.sub};
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  width: 22px;
  div{
    font-size: 1.1rem;
  }
}
`
}}
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
  answers: any;
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

function Test({answers, question, currentTest, handleOptionClick, handlePreviousButtonClick, handleSubmitButtonClick}: TestProps) {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { view, color } = viewState;

  let arrForCounter = new Array(20 - currentTest).fill(0); 
  let arrForCounterChecked = new Array(currentTest).fill(0);

  return (
    <TestContainer variants={containerVariants} initial="hidden" animate="visible" exit="exit">
      <div className="test__main">
      <TestMainGuide>Now then, <br/> answer the twenty questions below, plz :)</TestMainGuide>
      <TestGuide>{view === "mobile" ? "Choose an option which describes you better" : "Choose one option which describes you better"}</TestGuide>
      <Question>
        <div className="test__question-number">Q{question.number}</div>
        <div className="test__question">
          {question.question.map((item: string) => {
            return <div>{item}</div>
          })}
        </div>
      </Question>
      <div className="option-flex-container">
        <OptionCardContainer optionId={0}>
        <div className="backBtn" onClick={handlePreviousButtonClick}>
          <div>{view === "mobile" ? "Previous Question" : "◀ Previous Question"}</div>
          </div>
          <OptionCard currentTest={currentTest} answers={answers} num={1} pic={question.pic1} option={question.option1} handleOptionClick={handleOptionClick}/>
        </OptionCardContainer>
        <OptionCardContainer optionId={1}>
          <OptionCard currentTest={currentTest} answers={answers} num={2} pic={question.pic2} option={question.option2} handleOptionClick={handleOptionClick}/>
          <div className="submitBtn" onClick={handleSubmitButtonClick}>
            <div>{view === "mobile" ? "NEXT" : currentTest === 20 ? "▶ SUBMIT" : "▶ NEXT"}</div>
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