import styled, { css } from 'styled-components';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import ResultCloseBtn from './ResultCloseBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';
import axios from "axios";

interface GirlGroupContainerProps {
  girlGroupIndex?: any;
  view?: any;
  girGroupPicUrl?: any;
}

const ResultGirlGroupContainer = styled(motion.div)<GirlGroupContainerProps>`
${( { theme, girlGroupIndex, girGroupPicUrl, view } ) => {
  return css`
background: ${theme.color.sub};
border: 3px solid ${theme.color.main};
border-right: none;
width: 400px;
height: 500px;
position: absolute;
top: 250px;
left: 1020px;
font-weight: 800;
font-style: italic;
color: ${theme.color.main};
overflow-y: ${view === "mobile" ? null : "scroll"};
z-index: ${girlGroupIndex};
.result-scroll-container{
  display: flex;
  flex-direction: column;
}
.result-girlGroup-title {
  background-color: ${theme.color.main};
  color: ${theme.color.sub};
  padding: 1rem;
  .title1{
    background-color: ${theme.color.sub};
    color: ${theme.color.main};
    padding: 0.25rem;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .title2{
    padding: 0.4rem 0;
    font-size: 2.5rem;
    margin-top: 0.75rem;
    span{
      background-color: ${theme.color.sub};
      color: ${theme.color.main};
      padding: 0.25rem 0.5rem;
    }
  }
}
.result-girlGroup-mid {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  padding: 2rem 1rem 0;
  align-items: center;
  .result-girlGroup-pic{
    border: 2px solid ${theme.color.main};
    width: 60%;
    height: 60%;
    background-image: url(${girGroupPicUrl});
    background-size: cover;
    background-position: center;
  }
  .result-girlGroup-slogan {
    background-color: ${theme.color.main};
    color: ${theme.color.sub};
    padding: 0.5rem 1rem;
    margin-top: 1rem;
  }
  .result-girlGroup-percent {
    margin-top: 1rem;
  }
}
.result-girlGroup-description {
  position: relative;
  padding: 0rem 1rem 1rem;
  font-weight: 400;
  top: -1.5rem;
  .result-girlGroup-description-title {
    font-weight: 800;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
}
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
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  width: 100%;
  border: none;
  border-bottom: 3px solid ${theme.color.main};
  position: relative;
  top: 0;
  left: 0;
  height: auto;
}
`
}}
`;

const ResultGirlGroup = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { view } = viewState;

  const [mouseIn, setMouseIn] = useState(false);
  const [percent, setPercent] = useState(0);

  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: any) => item.mbti === myMBTI)[0];

  useEffect(() => {
    axios.all([axios.get("http://localhost:3000/result"), axios.get(`http://localhost:3000/result/${myMBTI}`)])
    .then(
      axios.spread((res1, res2) => {
        let wholeResults = res1.data.results.length;
        let specificResults = res2.data.results.length;
        setPercent(specificResults / wholeResults * 100);
        console.log(specificResults / wholeResults * 100);
      })
    )
  }, [])

  return (
    <>{
      view === "mobile" ?     
      <ResultGirlGroupContainer girGroupPicUrl={myKpopGroup.albumCover[0]} view={view} onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="girlGroup">
      <div className="result-scroll-container girlGroup">
        <div className="result-girlGroup-title girlGroup">
          <span className="title1 girlGroup">Your Kpop Girl Group Ego is</span>
          <div className="title2 girlGroup"><span className="girlgroup-span1 girlGroup">{myKpopGroup.name}</span> <span className="girlgroup-span2 girlGroup">type!</span></div>          
        </div>
        <div className="result-girlGroup-mid girlGroup">
          <div className="result-girlGroup-pic girlGroup"></div>
          <div className="result-girlGroup-slogan girlGroup">{myKpopGroup.slogan}</div>
          <div className="result-girlGroup-percent girlGroup">테스트 참여 유저 중 총 {percent}%</div>
        </div>
        <div className="result-girlGroup-description girlGroup">
        <div className="result-girlGroup-description-title girlGroup">description</div>
          <div className="result-girlGroup-description-text girlGroup">
            {myKpopGroup.description}
          </div>
        </div>
      </div>
    </ResultGirlGroupContainer> 
      :     
    <ResultGirlGroupContainer girGroupPicUrl={myKpopGroup.albumCover[0]} view={view} onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="girlGroup" onClick={props.handleResultComponentClick} girlGroupIndex={props.girlGroupIndex} drag dragConstraints={props.constraintsRef}>
      {mouseIn ? <ResultCloseBtn closeId={"girlGroup"} handleCloseBtn={props.handleCloseBtn}/> : null}
      <div className="result-scroll-container girlGroup">
        <div className="result-girlGroup-title girlGroup">
          <span className="title1 girlGroup">Your Kpop Girl Group Ego is</span>
          <div className="title2 girlGroup"><span className="girlgroup-span1 girlGroup">{myKpopGroup.name}</span> <span className="girlgroup-span2 girlGroup">type!</span></div>          
        </div>
        <div className="result-girlGroup-mid girlGroup">
          <div className="result-girlGroup-pic girlGroup"></div>
          <div className="result-girlGroup-slogan girlGroup">{myKpopGroup.slogan}</div>
          <div className="result-girlGroup-percent girlGroup">테스트 참여 유저 중 총 {percent}%</div>
        </div>
        <div className="result-girlGroup-description girlGroup">
        <div className="result-girlGroup-description-title girlGroup">description</div>
          <div className="result-girlGroup-description-text girlGroup">
            {myKpopGroup.description}
          </div>
        </div>
      </div>
    </ResultGirlGroupContainer> 
    }
    </>   
  )
}

export default ResultGirlGroup ;