import { Fragment } from "react";
import styled from "styled-components";

const OptionCardContainer = styled.div`
width: 100%;
height: 100%;
background-color: gray;
display: flex;
flex-direction: column;
`;

const ImageBox = styled.div`
width: 100%;
height: 50%;
background-color: aliceblue;
div {
  width: 100%;
  height: 100%;
  background-color: red;
}
`;

const DescriptionBox = styled.div`
width: 100%;
border-radius: 10px;
height: 50%;
background-color: yellow;
div {
  width: 100%;
  height: 100%;
  background-color: red;
}
`

interface OptionCardProps {
  id: number;
  onClick: (e: any) => any;
  option: string;
  image: string;
  goToNextQuestion: (e: any) => any;
}

function OptionCard(props: OptionCardProps): JSX.Element {
  return (
    <OptionCardContainer onClick={props.goToNextQuestion}>
      <ImageBox><div className={props.id.toString()}/></ImageBox>
      <DescriptionBox><div className={props.id.toString()}>{props.option}</div></DescriptionBox>
    </OptionCardContainer>
  )
}

export default OptionCard;