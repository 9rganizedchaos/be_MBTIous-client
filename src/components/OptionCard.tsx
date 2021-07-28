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
`;

const DescriptionBox = styled.div`
width: 100%;
border-radius: 10px;
height: 50%;
background-color: yellow;
`

function OptionCard() {
  return (
    <OptionCardContainer>
      <ImageBox/>
      <DescriptionBox/>
    </OptionCardContainer>
  )
}

export default OptionCard;