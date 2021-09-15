import styled, { css } from 'styled-components';
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from 'react';
import ResultCloseBtn from './ResultCloseBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';
import axios from "axios";

interface GirlGroupContainerProps {
  girlGroupIndex?: any;
  view?: any;
  girlGroupPicUrl?: any;
}

const ResultGirlGroupContainer = styled(motion.div)<GirlGroupContainerProps>`
${( { theme, girlGroupIndex, girlGroupPicUrl, view } ) => {
  return css`
background: ${theme.color.sub};
border: 3px solid ${theme.color.main};
border-right: none;
width: 400px;
height: 600px;
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
    background-image: url(${girlGroupPicUrl});
    background-size: cover;
    background-position: center;
  }
  .result-girlGroup-slogan {
    background-color: ${theme.color.main};
    color: ${theme.color.sub};
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    text-align:center;
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
  .description-text-container {
    display: flex;
    flex-direction: column;
    .result-girlGroup-description-text{
      margin: 0.5rem 0;
      font-weight: 400;
    }
    strong {
      font-weight: 800;
    }
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

const getProfilePic = (group: any) => {
  let randomNum = Math.floor(Math.random() * group.albumCover) + 1;
  return `https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${group.code}${randomNum}.jpeg`;
}

const ResultGirlGroup = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { result } = testState;
  const { view } = viewState;
  const [mouseIn, setMouseIn] = useState(false);
  const [percent, setPercent] = useState(0);

  const girlGroupProfilePic = useMemo(() => getProfilePic(props.myKpopGroup), [props.myKpopGroup]);

  useEffect(() => {
    console.log(props.myMBTI)
    axios.all([axios.get(`https://server.mbtious.net/result`), axios.get(`https://server.mbtious.net/result/${props.myKpopGroup.mbti}`)])
    .then(
      axios.spread((res1, res2) => {
        let wholeResults = res1.data.results.length;
        let specificResults = res2.data.results.length;
        setPercent(Math.floor(specificResults / wholeResults * 100));
      })
    )
  }, [])

  return (
    <>{
      view === "mobile" ?     
      <ResultGirlGroupContainer girlGroupPicUrl={girlGroupProfilePic} view={view} onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="girlGroup">
      <div className="result-scroll-container girlGroup">
        <div className="result-girlGroup-title girlGroup">
          <span className="title1 girlGroup">Your Kpop Girl Group Ego is</span>
          <div className="title2 girlGroup"><span className="girlgroup-span1 girlGroup">{props.myKpopGroup.name}</span> <span className="girlgroup-span2 girlGroup">type!</span></div>          
        </div>
        <div className="result-girlGroup-mid girlGroup">
          <div className="result-girlGroup-pic girlGroup"></div>
          <div className="result-girlGroup-slogan girlGroup">{props.myKpopGroup.slogan}</div>
          <div className="result-girlGroup-percent girlGroup">테스트 참여 유저 중 총 약 {percent}%</div>
        </div>
        <div className="result-girlGroup-description girlGroup">
        <div className="result-girlGroup-description-title girlGroup">description</div>
        <div className="description-text-container girlGroup">
        {props.myKpopGroup.description.map((item: string) => {
          return <div className="result-girlGroup-description-text girlGroup">{item}</div>
        })}
        </div>
        </div>
      </div>
    </ResultGirlGroupContainer> 
      :     
    <ResultGirlGroupContainer girlGroupPicUrl={girlGroupProfilePic} view={view} onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="girlGroup" onClick={props.handleResultComponentClick} girlGroupIndex={props.girlGroupIndex} drag dragConstraints={props.constraintsRef}>
      {mouseIn ? <ResultCloseBtn closeId={"girlGroup"} handleCloseBtn={props.handleCloseBtn}/> : null}
      <div className="result-scroll-container girlGroup">
        <div className="result-girlGroup-title girlGroup">
          <span className="title1 girlGroup">Your Kpop Girl Group Ego is</span>
          <div className="title2 girlGroup"><span className="girlgroup-span1 girlGroup">{props.myKpopGroup.name}</span> <span className="girlgroup-span2 girlGroup">type!</span></div>          
        </div>
        <div className="result-girlGroup-mid girlGroup">
          <div className="result-girlGroup-pic girlGroup"></div>
          <div className="result-girlGroup-slogan girlGroup">{props.myKpopGroup.slogan}</div>
          <div className="result-girlGroup-percent girlGroup">테스트 참여 유저 중 총 약 {percent}%</div>
        </div>
        <div className="result-girlGroup-description girlGroup">
        <div className="result-girlGroup-description-title girlGroup">description</div>
        <div className="description-text-container girlGroup">
        {props.myKpopGroup.description.map((item: string) => {
          let textArr = item.split(`"`);
          return <div className="result-girlGroup-description-text girlGroup">{
            textArr.map((miniItem: any, index: number) => {
              if(index % 2 === 1){
                return <strong>{miniItem}</strong>
              } else {
                return miniItem
              }
            })
          }</div>
        })}
        </div>
        </div>
      </div>
    </ResultGirlGroupContainer> 
    }
    </>   
  )
}

export default ResultGirlGroup ;