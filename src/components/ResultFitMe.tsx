import styled from 'styled-components'
import { motion } from "framer-motion";

interface fitMeProps {
  pic: string
}

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
  color: #705DF2;
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

const FitMeArtistPic1 = styled.div<fitMeProps>`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  border: 3px solid #705DF2;
  span {
    font-size: 2.5rem;
    position: absolute;
  }
  div {
    width: calc(250px - 0.25rem);
    height: calc(250px - 0.3rem);
    background-image: url(${(props => props.pic)});
    background-position: center;
    background-size: cover;
    opacity: 0.25;
  }
`;

const FitMeArtistPic2 = styled.div<fitMeProps>`
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  border: 3px solid #705DF2;
  border-left: none;
  span {
    font-size: 2.5rem;
    position: absolute;
  }
  div {
    width: calc(250px);
    height: calc(250px - 0.3rem);
    background-image: url(${(props => props.pic)});
    background-position: center;
    background-size: cover;
    opacity: 0.25;
  }
`;


const ResultFitMe = function(props: any){
  return (
    <ResultFitMeContainer drag dragConstraints={props.constraintsRef}>
      <FitMeArtistPic1 pic="https://i.imgur.com/1eHg1CG.jpg">
        <div></div>
        <span>BlackPink</span>
      </FitMeArtistPic1>
      <div className="notFitMeTitle">나와 잘 맞지 않는 유형</div>
      <div className="fitMeTitle">나와 잘 맞는 유형</div>
      <FitMeArtistPic2 pic="https://i.imgur.com/wqJmRDG.jpg">
        <div></div>
        <span>IZ*ONE</span>
      </FitMeArtistPic2>
    </ResultFitMeContainer>    
  )
}

export default ResultFitMe ;