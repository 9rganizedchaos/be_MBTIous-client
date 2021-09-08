import {withRouter} from "react-router";
import Test from "../components/Test";
import styled, { css } from "styled-components";
import questionArr from "../assets/questions"
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { updateResult } from "../action/actions";
import { Link } from 'react-router-dom';
import TestAlert from '../components/TestAlert';
import PreviousAlert from '../components/PreviousAlert';
import SettingBar from '../components/SettingBar';
import axios from "axios";
import groupsArr from '../assets/groups';

interface Edge {
  left: number;
  right: number;
}

interface ArtistEdge {
  top: number;
  bottom: number;
}

const Logo = styled.div`
${( { theme } ) => {
  return css`
position: absolute;
left: 0;
color: ${theme.color.main};
font-weight: 800;
font-style: italic;
font-size: 2rem;
margin: 1rem;
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {

}
`
}}
`;

const ArtistSideEdge = styled.div<Edge>`
${( { theme, left, right } ) => {
  return css`
position: absolute;
left: ${left ? 100 : 0};
right: ${right ? 100 : 0};
top: 0;
width: 0.25rem;
height: 100vh;
background-color: ${theme.color.main};
z-index: 5;
`
}}
`;

const ArtistEdgeTop = styled.div<ArtistEdge>`
${( { theme, top, bottom } ) => {
  return css`
position: absolute;
top: ${top ? 100 : 0};
bottom: ${bottom ? 100 : 0};
left: 0;
width: 100vw;
height: 0.25rem;
background-color: ${theme.color.main};
z-index: 5;
`
}}
`;

const TestpageContainer = styled(motion.div)`
${( { theme } ) => {
  return css`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-itmes: center;
background-color: ${theme.color.sub};
border: 0.25rem solid ${theme.color.main};
.test__border-box{
  position: absolute;
  width: 620px;
  height: calc(100vh - 0.5rem);
  background-color: ${theme.color.sub};
  display: flex;
  align-items: center;
  border-left: 0.25rem solid ${theme.color.main};
  border-right: 0.25rem solid ${theme.color.main};
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  overflow: hidden;
  .test__border-box{
    width: 100%;
  }
}
`
}}
`;

function TestPage(props: any) {
  const testState = useSelector((state: RootState) => state.testReducer);
  const { favoriteArtist } = testState;

  const dispatch = useDispatch();
  
  const [isAlertMessageOpen, setAlertOpen] = useState(false);
  const [isPreAlertMessageOpen, setPreAlertOpen] = useState(false);
  const [alertPageX, setPageX] = useState(0);
  const [alertPageY, setPageY] = useState(0);


  const [currentTest, setCurrentTest] = useState(1);
  const [answers, setAnswers] = useState([
    {
      answer: 0,
      answered: false
    }, 
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    }, 
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
    {
      answer: 0,
      answered: false
    },
  ])

  const handlePreviousButtonClick = (e: any) => {
    if(currentTest === 1){
      setPreAlertOpen(true);
      setTimeout(() => {
        setPreAlertOpen(false);
      }, 1500);
      setPageX(e.pageX);
      setPageY(e.pageY);
    }
    if(currentTest > 1) {
      setCurrentTest (currentTest - 1);
    }
  }

  const handleOptionClick = (e: any) => {
    let classNameArr = e.target.className.split(" ")
    let lastClassName = classNameArr[classNameArr.length - 1];
    let newAnswers;
    if(answers[currentTest - 1].answered === false || answers[currentTest - 1].answer !== Number(lastClassName)){
      newAnswers = {
        answer: Number(lastClassName),
        answered: true
      }
      let newState = answers.slice();
      newState.splice(currentTest - 1, 1, newAnswers);
      setAnswers(newState);
    } else if (answers[currentTest - 1].answer === Number(lastClassName)){
      newAnswers = {
        answer: 0,
        answered: false
      }
      let newState = answers.slice();
      newState.splice(currentTest - 1, 1, newAnswers);
      setAnswers(newState);
    }
  }

  const handleSubmitButtonClick = (e: any) => {
    if(!answers[currentTest - 1].answered) {
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 1500);
      setPageX(e.pageX);
      setPageY(e.pageY);
    } else {
      if(currentTest < 20){
        setCurrentTest(currentTest + 1);
      } else if (currentTest === 20){
        let resultObj: any = {}
        let result = "";
        let EI = answers.filter((item, index) => index % 4 === 0).map(item => item.answer).reduce((acc, cur) => {return acc + cur}, 0)
        let NS = answers.filter((item, index) => index % 4 === 1).map(item => item.answer).reduce((acc, cur) => {return acc + cur}, 0)
        let TF = answers.filter((item, index) => index % 4 === 2).map(item => item.answer).reduce((acc, cur) => {return acc + cur}, 0)
        let JP = answers.filter((item, index) => index % 4 === 3).map(item => item.answer).reduce((acc, cur) => {return acc + cur}, 0)
        if(EI > 2){
          result = result + "E"
          resultObj.E = EI;
          resultObj.I = 5 - EI;
        } else {
          result = result + "I"
          resultObj.I = 5 - EI;
          resultObj.E = EI;
        }
        if(NS > 2){
          result = result + "N"
          resultObj.N = NS;
          resultObj.S = 5 - NS;
        } else {
          result = result + "S"
          resultObj.S = 5 - NS;
          resultObj.N = NS;
        }
        if(TF > 2){
          result = result + "T"
          resultObj.T = TF;
          resultObj.F = 5 - TF;
        } else {
          result = result + "F"
          resultObj.F = 5 - TF;
          resultObj.T = TF;
        }
        if(JP > 2){
          result = result + "J"
          resultObj.J = JP;
          resultObj.P = 5 - JP;
        } else {
          result = result + "P"
          resultObj.P = 5 - JP;
          resultObj.J = JP;
        }
        resultObj.answers = answers;
        resultObj.mbti = result;

        dispatch(updateResult(resultObj, favoriteArtist));

        let kpopGroup = groupsArr.filter((item: any) => item.mbti === result)[0];


        console.log(result, kpopGroup.name, favoriteArtist);

        axios.post(`https://server.mbtious.net/result`, {
          mbti: result,
          girlGroupName: kpopGroup.name,
          favoriteGroup: favoriteArtist
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })
      
        props.history.push("/result");
      }
    }
  }

  return (
    <TestpageContainer>
      <SettingBar handleThemeChange={props.handleThemeChange}/>
      <AnimatePresence>
      {isPreAlertMessageOpen ? <PreviousAlert alertPageX={alertPageX} alertPageY={alertPageY}/> : null}
      {isAlertMessageOpen ? <TestAlert alertPageX={alertPageX} alertPageY={alertPageY}/> : null}
      </AnimatePresence>
      <Link to="/">
        <Logo>Be_MBTIous</Logo>
      </Link>
      <ArtistSideEdge left={100} right={0}/>
      <ArtistSideEdge left={0} right={100}/>
      <ArtistEdgeTop top={100} bottom={0}/>
      <ArtistEdgeTop top={0} bottom={100}/>
      <div className="test__border-box">
        <AnimatePresence>
      {currentTest > 20 ? null : questionArr.filter((item, index) => index === currentTest - 1).map((question) => 
      <Test currentTest={currentTest} answers={answers} question={question} handleOptionClick={handleOptionClick} handlePreviousButtonClick={handlePreviousButtonClick} handleSubmitButtonClick={handleSubmitButtonClick} key={question.number}/>
      )}</AnimatePresence>
      </div>
    </TestpageContainer>
  )
}

export default withRouter(TestPage);