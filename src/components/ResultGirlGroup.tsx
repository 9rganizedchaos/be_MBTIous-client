import styled, { css } from 'styled-components';
import { motion } from "framer-motion";
import { useState } from 'react';
import ResultCloseBtn from './ResultCloseBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';

interface GirlGroupContainerProps {
  girlGroupIndex: any;
}

const ResultGirlGroupContainer = styled(motion.div)<GirlGroupContainerProps>`
${( { theme, girlGroupIndex } ) => {
  return css`
background: ${theme.color.sub};
border: 3px solid ${theme.color.main};
border-right: none;
width: 400px;
height: 500px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
font-weight: 800;
font-style: italic;
overflow-y: scroll;
color: ${theme.color.main};
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: ${theme.color.sub};
  border: 2px solid ${theme.color.main};
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background-color: ${theme.color.main};
  width: 100px;
}
z-index: ${girlGroupIndex}
`
}}
`;

const ResultGirlGroup = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;

  const [mouseIn, setMouseIn] = useState(false);

  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: any) => item.mbti === myMBTI)[0];


  return (
    <ResultGirlGroupContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="girlGroup" onClick={props.handleResultComponentClick} girlGroupIndex={props.girlGroupIndex} drag dragConstraints={props.constraintsRef}>
      {mouseIn ? <ResultCloseBtn closeId={"girlGroup"} handleCloseBtn={props.handleCloseBtn}/> : null}
      <div>
        <div>Your Kpop Girl Group Ego Is</div>
        <div>{myKpopGroup.name}</div>
      </div>
      <div>
        <div>그림들어갈 부분</div>
      </div>
      <div>
        줄글 설명
      </div>
      <div>
        곡에서 가사 추출
      </div>
    </ResultGirlGroupContainer>    
  )
}

export default ResultGirlGroup ;