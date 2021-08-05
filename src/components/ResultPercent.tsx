import styled from 'styled-components'
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import { useState } from 'react';

interface PieData {
  name: string,
  value: number,
  color: string,
  percent: number,
}

const ResultPercentContainer = styled.div `

`;

const ResultPercent = function(props: any){
  return (
    <ResultPercentContainer>
      <div id="pieGraph"></div>
    </ResultPercentContainer>    
  )
}

export default ResultPercent ;