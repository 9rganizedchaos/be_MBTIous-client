import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import groupsArr from "../assets/groups"
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
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
top: 50px;
left: 680px;
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
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  width: 100%;
  height: calc(50vw + 50px);
  border: none;
  border-bottom: 3px solid ${theme.color.main};
  position: relative;
  top: 0;
  left: 0;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 50px calc(50vw - 50px) 50px;
  .fitMeTitle{
    border: none;
    border-right: 3px solid ${theme.color.main};
  }
  .notFitMeTitle{
    border: none;
    border-bottom: none;
    border-left: none;
  }
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
  .pic1Box {
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  .pic1SpanName {
    font-size: 2rem;
  }
  .pic1SpanMBTI {
    font-size: 1.125rem;
  }
  .pic1Div {
    width: calc(250px - 0.25rem);
    height: calc(250px - 0.3rem);
    background-image: url(${pic});
    background-position: center;
    background-size: cover;
    opacity: 0.25;
  }
  @media (${theme.size.tablet}) {
  }
  @media (${theme.size.mobile}) {
    border: none;
    border-right: 3px solid ${theme.color.main};
    border-bottom: 3px solid ${theme.color.main};
    .pic1Div {
      width: calc(100vw / 2 - 0.25rem);
      height: calc(100vw / 2 - 0.25rem);
    }
    .pic1Span {
      font-size: 1.5rem;
    }
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
  .pic2Box {
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  .pic2SpanName {
    font-size: 2rem;
  }
  .pic2SpanMBTI {
    font-size: 1.125rem;
  }
  .pic2Div {
    width: calc(250px);
    height: calc(250px - 0.3rem);
    background-image: url(${pic});
    background-position: center;
    background-size: cover;
    opacity: 0.25;
  }
  @media (${theme.size.tablet}) {
  }
  @media (${theme.size.mobile}) {
    border: none;
    border-top: 3px solid ${theme.color.main};
    .pic2Div {
      width: calc(100vw / 2 - 0.25rem);
      height: calc(100vw / 2 - 0.25rem);
    }
    .pic2Span {
      font-size: 1.5rem;
    }
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
    transition: .5s;
    &:hover{
      cursor: pointer;
      color: ${theme.color.sub2};
    }
    font-size: 3rem;
  }
  @media (${theme.size.tablet}) {
  }
  @media (${theme.size.mobile}) {
    width: 45vw;
    svg{
      font-size: 2.5rem;
    }
  }
  `
}}
`


const ResultFitMe = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { view } = viewState;
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
    <>{
      view === "mobile" ?
      <ResultFitMeContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="fitMe" onClick={props.handleResultComponentClick} fitMeIndex={props.fitMeIndex}>
      <FitMeArtistPic1 className="fitMe" pic={`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${fitMeGroup.code}1.jpeg`}>
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
          <div className="pic1Box fitMe">
            <span className="pic1SpanName fitMe">{fitMeGroup.name}</span>
            <span className="pic1SpanMBTI fitMe">{fitMeGroup.mbti}</span>
          </div>
      </FitMeArtistPic1>
      <div className="notFitMeTitle fitMe">나와 잘 맞지 않는 유형</div>
      <div className="fitMeTitle fitMe">나와 잘 맞는 유형</div>
      <FitMeArtistPic2 className="fitMe" pic={`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${notFitMeGroup.code}1.jpeg`}>
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
          <div className="pic2Box fitMe">
            <span className="pic2SpanName fitMe">{notFitMeGroup.name}</span>
            <span className="pic2SpanMBTI fitMe">{notFitMeGroup.mbti}</span>
          </div>
      </FitMeArtistPic2>
    </ResultFitMeContainer> :
        <ResultFitMeContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="fitMe" onClick={props.handleResultComponentClick} fitMeIndex={props.fitMeIndex} drag dragConstraints={props.constraintsRef}>
        {mouseIn ? <ResultCloseBtn closeId={"fitMe"} handleCloseBtn={props.handleCloseBtn} /> : null}
        <FitMeArtistPic1 className="fitMe" pic={`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${fitMeGroup.code}1.jpeg`}>
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
          <div className="pic1Box fitMe">
            <span className="pic1SpanName fitMe">{fitMeGroup.name}</span>
            <span className="pic1SpanMBTI fitMe">{fitMeGroup.mbti}</span>
          </div>
        </FitMeArtistPic1>
        <div className="notFitMeTitle fitMe">나와 잘 맞지 않는 유형</div>
        <div className="fitMeTitle fitMe">나와 잘 맞는 유형</div>
        <FitMeArtistPic2 className="fitMe" pic={`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${notFitMeGroup.code}1.jpeg`}>
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
          <div className="pic2Box fitMe">
            <span className="pic2SpanName fitMe">{notFitMeGroup.name}</span>
            <span className="pic2SpanMBTI fitMe">{notFitMeGroup.mbti}</span>
          </div>
        </FitMeArtistPic2>
      </ResultFitMeContainer>
    }

    </>
  )
}

export default ResultFitMe ;