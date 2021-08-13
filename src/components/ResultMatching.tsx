import styled, { css } from 'styled-components';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faCrown, faGhost, faMugHot, faViruses } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../reducers';
import { useSelector } from 'react-redux';
import groupsArr from '../assets/groups';
import { useEffect, useState } from 'react';
import ResultCloseBtn from './ResultCloseBtn';

interface MatchingContainerProps {
  matchingIndex: any;
}

const ResultMatchingContainer = styled(motion.div)<MatchingContainerProps>`
${( { theme, matchingIndex } ) => {
  return css`
background: ${theme.color.sub};
border: 3px solid ${theme.color.main};
width: 300px;
height: 300px;
position: absolute;
top: 400px;
left: 440px;
font-weight: 800;
font-style: italic;
.matching-svg {
  position: absolute;
  font-size: 12rem;
  color: ${theme.color.main};
  top: 48%;
  left: 50%;
  transform: translate(-50%, -55%);
}
.matching-div {
  width: 90%;
  position: absolute;
  top: 87%;
  left: 55%;
  transform: translateX(-50%);
  background-color: ${theme.color.main};
  color: ${theme.color.sub};
  padding: 0.2rem;
}
span {
  position: absolute;
  font-size: 3.5rem;
  top: 30%;
  left: 10%;
  transform: rotate(-20deg);
  -webkit-text-fill-color: ${theme.color.sub};
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${theme.color.main};
}
z-index: ${matchingIndex};
`
}}
`;

const compabilityArr = [
  {
    title: "Warning!",
    icon: faBomb
  },
  {
    title: "Not Good!",
    icon: faViruses
  }, 
  {
    title: "So So!",
    icon: faGhost
  },
  {
    title: "Great!",
    icon: faMugHot
  },
  {
    title: "Soul Mates!",
    icon: faCrown
  }
]

const ResultMatching = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result, favoriteArtist } = testState;
  const [mouseIn, setMouseIn] = useState(false);

  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: any) => item.name === favoriteArtist);
  let index = myKpopGroup[0].fitMe[myMBTI] - 1

  return (
    <ResultMatchingContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="matching" onClick={props.handleResultComponentClick} matchingIndex={props.matchingIndex} drag dragConstraints={props.constraintsRef}>
      {mouseIn ? <ResultCloseBtn closeId={"matching"} handleCloseBtn={props.handleCloseBtn}/> : null}
      <FontAwesomeIcon className="matching-svg matching" icon={compabilityArr[index].icon}></FontAwesomeIcon>
      <span className="matching">{compabilityArr[index].title}</span>
      <div className="matching-div matching">최애 그룹({favoriteArtist})과의 궁합은 !</div>
    </ResultMatchingContainer>    
  )
}

export default ResultMatching ;