import styled from 'styled-components';
import { motion } from "framer-motion";

interface AlphabetContainerProps {
  animationNum: number;
}

const WholeContainer = styled(motion.div)`
background: #1b1b1b;
width: 300px;
height: 170px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
padding: 1rem 0 0.25rem;
border: 3px solid #705DF2;
div {
  color: #705DF2;
  font-size: 1.25rem;
}
`;

const AlphabetContainer = styled(motion.div)<AlphabetContainerProps>`
display: flex;
justify-content: center;
align-items: center;
h2{
  position: absolute;
  font-size: 6rem;
}
.front-alphabet{
  color: transparent;
  -webkit-text-stroke: 2px #705DF2;
}
.back-alphabet {
  color: #705DF2;
  opacity: 0.75;
  animation: ${(props => props.animationNum > 4 ? "animate1 2s ease-in-out infinite" : "animate2 2s ease-in-out infinite")};
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
`;

const ResultAlphabetContainer = styled(motion.div) `
width: 100%;
height: 100%;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: row;
postion: relative;
padding: 0 1rem;
`;

const ResultAlphabet = function(props: any){
  return (
    <WholeContainer drag dragConstraints={props.constraintsRef}>
      <div>Your MBTI Type is...!</div>
    <ResultAlphabetContainer>
      <AlphabetContainer animationNum={3}>
        <h2 className="front-alphabet">E</h2>
        <h2 className="back-alphabet">E</h2>
      </AlphabetContainer>    
        <AlphabetContainer animationNum={4}>
        <h2 className="front-alphabet">N</h2>
        <h2 className="back-alphabet">N</h2>
      </AlphabetContainer>  
      <AlphabetContainer animationNum={5}>
        <h2 className="front-alphabet">F</h2>
        <h2 className="back-alphabet">F</h2>
      </AlphabetContainer>  
      <AlphabetContainer animationNum={3}>
        <h2 className="front-alphabet">J</h2>
        <h2 className="back-alphabet">J</h2>
      </AlphabetContainer>  
    </ResultAlphabetContainer>
    </WholeContainer>
  )
}

export default ResultAlphabet ;