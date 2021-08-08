import styled from 'styled-components'
import { useRef, useState } from 'react';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { Pie } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';

interface PercentContainerProps {
  percentIndex: any;
}

const ResultPercentContainer = styled(motion.div)<PercentContainerProps>`
background: #1b1b1b;
border: 3px solid #705DF2;
width: 400px;
height: 500px;
position: absolute;
top: 400px;
left: 440px;
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
div {
  background-color: #705DF2;
  margin-bottom: 1rem;
  color: #1b1b1b;
  padding: 0.25rem;
}
z-index: ${props => props.percentIndex}
`;

const ResultPercent = function(props: any){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { favoriteArtist, result } = testState;

  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: any) => item.mbti === myMBTI)[0];

  const resultPieChart = useRef(null);

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
    
  }, [])

  return (
    <ResultPercentContainer className="percent" onClick={props.handleResultComponentClick} percentIndex={props.percentIndex} drag dragConstraints={props.constraintsRef}>
      <div className="percent">{myKpopGroup.name}를 최애그룹으로 꼽은 유형</div>
      <Pie className="percent" data={data}></Pie>
    </ResultPercentContainer>
  )
}

export default ResultPercent ;