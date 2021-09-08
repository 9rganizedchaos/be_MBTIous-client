import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { Pie } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';
import ResultCloseBtn from "./ResultCloseBtn";
import { useState } from 'react';
import axios from "axios";

interface PercentContainerProps {
  percentIndex?: any;
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

const ResultPercent = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { view } = viewState;
  const [mouseIn, setMouseIn] = useState(false);
  const [labels, setLabels] = useState(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']);
  const [dataArr, setDataArr] = useState([12, 19, 3, 5, 2, 3]); 

  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: any) => item.mbti === myMBTI)[0];

  const data = {
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
  };

  useEffect(() => {
    axios.get('https://server.mbtious.net/result')
    .then(res => {
      console.log(res);
      let dataArr = [];
      let labels = [];
      let tempArr = [];
      let mbtiObj: any = {};
      let filteredResults = res.data.results.filter((item: any) => item.favoriteGroup === myKpopGroup.name);
      filteredResults.forEach((item: any) => {
        if(mbtiObj[item.mbti]){
          mbtiObj[item.mbti]++;
        } else {
          mbtiObj[item.mbti] = 1;
        }
      });
      for(let key in mbtiObj) {
        tempArr.push([key, mbtiObj[key]])
      }
      tempArr.sort((a, b) => a[1] - b[1]);

      console.log(tempArr)

      for(let item of tempArr){
        dataArr.push(item[1]);
        labels.push(item[0]);
      }
      setLabels(labels);
      setDataArr(dataArr);
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