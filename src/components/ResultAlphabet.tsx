import styled, { css } from 'styled-components';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import ResultCloseBtn from './ResultCloseBtn';
import { useState } from 'react';

interface AlphabetContainerProps {
  animationNum: number;
}

interface WholeContainerProps {
  alphabetIndex: any;
}

const WholeContainer = styled(motion.div)<WholeContainerProps>`
${( { theme, alphabetIndex } ) => {
  return css`
z-index: ${alphabetIndex};
background: ${theme.color.sub};
width: 300px;
height: 170px;
position: absolute;
top: 120px;
left: 500px;
font-weight: 800;
font-style: italic;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 1rem 0 0.25rem;
border: 3px solid ${theme.color.main};
div {
  color: ${theme.color.main};
  font-size: 1.25rem;
}
`
}}
`;

const AlphabetContainer = styled(motion.div)<AlphabetContainerProps>`
${( { theme, animationNum } ) => {
  return css`
display: flex;
justify-content: center;
align-items: center;
h2{
  position: absolute;
  font-size: 6rem;
}
.front-alphabet{
  color: transparent;
  -webkit-text-stroke: 2px ${theme.color.main};
}
.back-alphabet {
  color: ${theme.color.main};
  opacity: 0.75;
  animation: ${animationNum > 4 ? "animate1 2s ease-in-out infinite" : animationNum > 3 ? "animate2 2s ease-in-out infinite" : "animate3 2s ease-in-out infinite"};
}
@keyframes animate1 {
  0%, 100% {
    clip-path: polygon(0 22%, 120% 22%, 120% 100%, 0% 100%);
  } 50% {
    clip-path: polygon(0 24%, 120% 24%, 120% 100%, 0% 100%);
  }
}
@keyframes animate2 {
  0%, 100% {
    clip-path: polygon(0 42%, 120% 42%, 120% 100%, 0% 100%);
  } 50% {
    clip-path: polygon(0 44%, 120% 44%, 120% 100%, 0% 100%);
  }
}
@keyframes animate3 {
  0%, 100% {
    clip-path: polygon(0 62%, 120% 62%, 120% 100%, 0% 100%);
  } 50% {
    clip-path: polygon(0 64%, 120% 64%, 120% 100%, 0% 100%);
  }
}
`
}}
`;

const ResultAlphabetContainer = styled(motion.div) `
${( { theme } ) => {
  return css`
width: 100%;
height: 100%;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: row;
postion: relative;
padding: 0 1rem;
`
}}
`;

const ResultAlphabet = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  let firstLetter = result.mbti[0];
  let secondLetter = result.mbti[1];
  let thirdLetter = result.mbti[2];
  let fourthLetter = result.mbti[3];
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <WholeContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="alphabet" onClick={props.handleResultComponentClick} alphabetIndex={props.alphabetIndex} drag dragConstraints={props.constraintsRef}>
      {mouseIn ? <ResultCloseBtn handleCloseBtn={props.handleCloseBtn} closeId={"alphabet"} /> : null}
      <div className="alphabet">Your MBTI Type is...!</div>
    <ResultAlphabetContainer className="alphabet">
      <AlphabetContainer className="alphabet" animationNum={result[firstLetter]}>
        <h2 className="front-alphabet alphabet">{firstLetter}</h2>
        <h2 className="back-alphabet alphabet">{firstLetter}</h2>
      </AlphabetContainer>    
        <AlphabetContainer className="alphabet" animationNum={result[secondLetter]}>
        <h2 className="front-alphabet alphabet">{secondLetter}</h2>
        <h2 className="back-alphabet alphabet">{secondLetter}</h2>
      </AlphabetContainer>  
      <AlphabetContainer className="alphabet" animationNum={result[thirdLetter]}>
        <h2 className="front-alphabet alphabet">{thirdLetter}</h2>
        <h2 className="back-alphabet alphabet">{thirdLetter}</h2>
      </AlphabetContainer>  
      <AlphabetContainer className="alphabet" animationNum={result[fourthLetter]}>
        <h2 className="front-alphabet alphabet">{fourthLetter}</h2>
        <h2 className="back-alphabet alphabet">{fourthLetter}</h2>
      </AlphabetContainer>  
    </ResultAlphabetContainer>
    </WholeContainer>
  )
}

export default ResultAlphabet ;