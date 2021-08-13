import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import groupsArr from "../assets/groups"
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useEffect } from 'react';
import { useState } from 'react';
import ResultCloseBtn from './ResultCloseBtn';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface fitMeContainerProps {
  fitMeIndex: any
}

interface fitMeProps {
  pic: string,
}

const ResultFitMeContainer = styled(motion.div)<fitMeContainerProps>`
${( { theme, fitMeIndex } ) => {
  return css`
background: ${theme.color.sub};
width: 500px;
height: 300px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
font-weight: 800;
font-style: italic;
display: grid;
grid-template-columns: repeat(2, 250px);
grid-template-rows: 50px 200px 50px;
z-index: ${fitMeIndex};
div{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${theme.color.main};
}
.fitMeTitle{
  border: 3px solid ${theme.color.main};
  border-top: none;
}
.notFitMeTitle{
  border: 3px solid ${theme.color.main};
  border-bottom: none;
  border-left: none;
}
`
}}
`;

const FitMeArtistPic1 = styled.div<fitMeProps>`
${( { theme, pic } ) => {
  return css`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  border: 3px solid ${theme.color.main};
  .pic1Span {
    font-size: 2rem;
    position: absolute;
  }
  .pic1Div {
    width: calc(250px - 0.25rem);
    height: calc(250px - 0.3rem);
    background-image: url(${pic});
    background-position: center;
    background-size: cover;
    opacity: 0.25;
  }
`
}}
`;

const FitMeArtistPic2 = styled.div<fitMeProps>`
${( { theme, pic } ) => {
  return css`
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  border: 3px solid ${theme.color.main};
  border-left: none;
  .pic2Span {
    font-size: 2rem;
    position: absolute;
  }
  .pic2Div {
    width: calc(250px);
    height: calc(250px - 0.3rem);
    background-image: url(${pic});
    background-position: center;
    background-size: cover;
    opacity: 0.25;
  }
`
}}
`;

const FitMeBtnBox = styled.span`
${( { theme } ) => {
  return css`
  position: absolute;
  width: 220px;
  display: flex;
  justify-content: space-between; 
  z-index: 10;
  svg{
    font-size: 3rem;
  }
  `
}}
`


const ResultFitMe = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  const [mouseIn, setMouseIn] = useState(false);
  const [fitMeNum, setFitMeNum] = useState(0);
  const [notFitMeNum, setNotFitMeNum] = useState(0);

  let fitMeGroups: any = [];
  let notFitMeGroups: any = [];
  let fitMeGroup: any;
  let notFitMeGroup: any;

    let myMBTI = result.mbti;
    let myKpopGroup = groupsArr.filter((item: any) => item.mbti === myMBTI);
    let myObj = myKpopGroup[0].fitMe
  
    let findNotFitMe = (obj : any, num: number) => {
      for (let key in obj){
        if (obj[key] === 5 - num){
          notFitMeGroups.push(key);
        }
      }
      if (notFitMeGroups.length === 0){
        findNotFitMe(obj, num + 1);
      } else {
        return;
      }
    }
  
    let findFitMe = (obj: any) => {
      for (let key in obj){
        if (obj[key] === 1){
          fitMeGroups.push(key);
        }
      }
    }
  
    findNotFitMe(myObj, 0);
    findFitMe(myObj);
  
    let fitMeLength = fitMeGroups.length;
    let notFitMeLength = notFitMeGroups.length;

    let fitMeMbti = fitMeGroups[fitMeNum % fitMeLength];
    let notFitMeMbti = notFitMeGroups[notFitMeNum % notFitMeLength];

    fitMeGroup = groupsArr.filter((item: any) => item.mbti === fitMeMbti)[0];
    notFitMeGroup = groupsArr.filter((item: any) => item.mbti === notFitMeMbti)[0];

  return (
    <ResultFitMeContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="fitMe" onClick={props.handleResultComponentClick} fitMeIndex={props.fitMeIndex} drag dragConstraints={props.constraintsRef}>
      {mouseIn ? <ResultCloseBtn closeId={"fitMe"} handleCloseBtn={props.handleCloseBtn} /> : null}
      <FitMeArtistPic1 className="fitMe" pic={fitMeGroup.albumCover[0]}>
        <FitMeBtnBox>
          <span onClick={() => {
            if(fitMeNum === 0){
              return;
            }
            setFitMeNum(fitMeNum - 1)}}>
            <FontAwesomeIcon icon={faCaretLeft}/>
          </span>
          <span onClick={() => {setFitMeNum(fitMeNum + 1)}}>
            <FontAwesomeIcon icon={faCaretRight}/>
          </span>
        </FitMeBtnBox>
        <div className="pic1Div fitMe"></div>
        <span className="pic1Span fitMe">{fitMeGroup.name}</span>
      </FitMeArtistPic1>
      <div className="notFitMeTitle fitMe">나와 잘 맞지 않는 유형</div>
      <div className="fitMeTitle fitMe">나와 잘 맞는 유형</div>
      <FitMeArtistPic2 className="fitMe" pic={notFitMeGroup.albumCover[0]}>
        <FitMeBtnBox>
          <span onClick={() => {
            if(notFitMeNum === 0){
              return;
            }
            setNotFitMeNum(notFitMeNum - 1)}}>
            <FontAwesomeIcon icon={faCaretLeft}/>
          </span>
          <span onClick={() => {
            setNotFitMeNum(notFitMeNum + 1)
            }}>
            <FontAwesomeIcon icon={faCaretRight}/>
          </span>
        </FitMeBtnBox>
        <div className="pic2Div fitMe"></div>
        <span className="pic2Span fitMe">{notFitMeGroup.name}</span>
      </FitMeArtistPic2>
    </ResultFitMeContainer>    
  )
}

export default ResultFitMe ;