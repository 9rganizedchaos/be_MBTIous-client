import styled from 'styled-components'
import { motion } from "framer-motion";

const ResultFitMeContainer = styled(motion.div)`
background: #1b1b1b;
width: 500px;
height: 300px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
display: grid;
grid-template-columns: repeat(2, 250px);
grid-template-rows: 50px 200px 50px;
div{
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #705DF2
}
.fitMeTitle{
  border: 3px solid #705DF2;
  border-top: none;
}
.notFitMeTitle{
  border: 3px solid #705DF2;
  border-bottom: none;
  border-left: none;
}
`;

const FitMeArtistPic1 = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  border: 3px solid #705DF2;
`;

const FitMeArtistPic2 = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  border: 3px solid #705DF2;
  border-left: none;
`;


const ResultFitMe = function(props: any){
  return (
    <ResultFitMeContainer drag dragConstraints={props.constraintsRef}>
      <FitMeArtistPic1/>
      <div className="notFitMeTitle">나와 잘 맞지 않는 유형</div>
      <div className="fitMeTitle">나와 잘 맞는 유형</div>
      <FitMeArtistPic2/>
    </ResultFitMeContainer>    
  )
}

export default ResultFitMe ;