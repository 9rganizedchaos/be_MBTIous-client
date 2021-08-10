import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import groupsArr from "../assets/groups"
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

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
  span {
    font-size: 2.5rem;
    position: absolute;
  }
  div {
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
  span {
    font-size: 2.5rem;
    position: absolute;
  }
  div {
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

const ResultFitMe = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  let fitMeGroups: any = [];
  let notFitMeGroups: any = [];

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

  let fitMeIndex = Math.floor(Math.random() * fitMeLength);
  let notFitMeIndex = Math.floor(Math.random() * notFitMeLength);

  let fitMeMbti = fitMeGroups[fitMeIndex];
  let notFitMeMbti = notFitMeGroups[notFitMeIndex];

  let fitMeGroup = groupsArr.filter((item: any) => item.mbti === fitMeMbti)[0];
  let notFitMeGroup = groupsArr.filter((item: any) => item.mbti === notFitMeMbti)[0];
  
  return (
    <ResultFitMeContainer className="fitMe" onClick={props.handleResultComponentClick} fitMeIndex={props.fitMeIndex} drag dragConstraints={props.constraintsRef}>
      <FitMeArtistPic1 className="fitMe" pic={fitMeGroup.albumCover[0]}>
        <div className="fitMe"></div>
        <span className="fitMe">{fitMeGroup.name}</span>
      </FitMeArtistPic1>
      <div className="notFitMeTitle fitMe">나와 잘 맞지 않는 유형</div>
      <div className="fitMeTitle fitMe">나와 잘 맞는 유형</div>
      <FitMeArtistPic2 className="fitMe" pic={notFitMeGroup.albumCover[0]}>
        <div className="fitMe"></div>
        <span className="fitMe">{notFitMeGroup.name}</span>
      </FitMeArtistPic2>
    </ResultFitMeContainer>    
  )
}

export default ResultFitMe ;