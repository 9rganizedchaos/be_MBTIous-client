import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { MutableRefObject, useEffect, useMemo } from 'react';
import { Pie } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';
import ResultCloseBtn from "./ResultCloseBtn";
import { useState } from 'react';
import axios from "axios";

interface Member {
  name: string;
  mbti: string;
}

interface Group {
  name: string;
  code: string;
  mbti: string;
  fitMe: object;
  memeber: Member[];
  albumCover: number;
  slogan: string;
  percent: number;
  description: string[];
}

interface ResultResponse {
    _id: string,
    mbti: string,
    girlGroupName: string,
    favoriteGroup: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}

interface mbtiObjProps {
  [key: string]: number;
}

interface ResultPercentProps {
  labels: string[];
  dataArr: number[];
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
  setDataArr: React.Dispatch<React.SetStateAction<number[]>>;
  handleResultComponentClick: React.MouseEventHandler;
  percentIndex?: number;
  constraintsRef?: MutableRefObject<null>;
  handleCloseBtn?: any;
}

interface PercentContainerProps {
  percentIndex?: number;
}

const ResultPercentContainer = styled(motion.div)<PercentContainerProps>`
${( { theme, percentIndex } ) => {
  return css`
background: ${theme.color.sub};
border: 3px solid ${theme.color.main};
width: 400px;
height: 500px;
position: absolute;
top: 250px;
left: 380px;
font-weight: 800;
font-style: italic;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
div {
  background-color: ${theme.color.main};
  margin-bottom: 1rem;
  color: ${theme.color.sub};
  padding: 0.25rem;
}
z-index: ${percentIndex};
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  position: relative;
  top: 0;
  left: 0;
  border: none;
  width: 100%;
  height: 130vw;
  border-bottom: 3px solid ${theme.color.main};
}
`
}}
`;

const updateData = (labels: string[], dataArr: number[]) => {
  let result = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: dataArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return result;
}

const ResultPercent = function(props: ResultPercentProps){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { view } = viewState;
  const [mouseIn, setMouseIn] = useState(false);

  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: Group) => item.mbti === myMBTI)[0];

  const data = useMemo(() => {
    return updateData(props.labels, props.dataArr)
  }, [props.labels, props.dataArr])

  useEffect(() => {
    axios.get('https://server.mbtious.net/result')
    .then(res => {
      let dataArr: number[] = [];
      let labels: string[] = [];
      let tempArr: [string, number][] = [];
      let mbtiObj: mbtiObjProps = {};
      let filteredResults = res.data.results.filter((item: ResultResponse) => item.favoriteGroup === myKpopGroup.name);
      filteredResults.forEach((item: ResultResponse) => {
        if(mbtiObj[item.mbti]){
          mbtiObj[item.mbti]++;
        } else {
          mbtiObj[item.mbti] = 1;
        }
      });
      for(let key in mbtiObj) {
        tempArr.push([key, mbtiObj[key]])
      }
      tempArr.sort((a: [string, number], b: [string, number]) => a[1] - b[1]);
      console.log(tempArr);

      for(let item of tempArr){
        dataArr.push(item[1]);
        labels.push(item[0]);
      }
      props.setLabels(labels);
      props.setDataArr(dataArr);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>{
      view === "mobile" ?     
      <ResultPercentContainer className="percent">
      <div className="percent">{myKpopGroup.name}를 최애그룹으로 꼽은 유형</div>
      <Pie className="percent" data={data}></Pie>
    </ResultPercentContainer> :
        <ResultPercentContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="percent" onClick={props.handleResultComponentClick} percentIndex={props.percentIndex} drag dragConstraints={props.constraintsRef}>
        {mouseIn ? <ResultCloseBtn closeId={"percent"} handleCloseBtn={props.handleCloseBtn}/> : null}
        <div className="percent">{myKpopGroup.name}를 최애그룹으로 꼽은 유형</div>
        <Pie className="percent" data={data}></Pie>
      </ResultPercentContainer>
    }
    </>
  )
}

export default ResultPercent ;