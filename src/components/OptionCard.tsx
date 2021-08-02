import { Fragment, useRef, Ref, FunctionComponent, useEffect } from "react";
import styled from "styled-components";

const OptionCardBox = styled.div`
width: 100%;
height: calc(100% - 5rem);
background-color: red;
`;

const ImageBox = styled.div`
width: 100%;
height: 268px;
border-bottom: 0.25rem solid #705DF2;
background-size: cover;
`;

const DescriptionBox = styled.div`
width: 100%;
height: calc(100% - 268px);
background-color: #1b1b1b;
color: #705DF2;
-webkit-text-decoration: underline;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
span {
  width: 90%;
  padding: 0.25rem;
  font-size: 1.125rem;
  background-color: #705DF2;
  text-align: center;
  color: #1b1b1b;
}
.optionTitle{
  width: 35%;
  margin-bottom: 0.5rem;
}
}
`

const OptionCard = function(props: any) {

  const imageBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(imageBox.current){
      imageBox.current.style.backgroundImage = `url(${props.pic})`;
    }
  }, [])

  return (
    <OptionCardBox>
      <ImageBox ref={imageBox}></ImageBox>
      <DescriptionBox className={`${props.num -1}`} onClick={props.handleOptionClick}>
        <span className={`optionTitle ${props.num -1}`}>{`option${props.num}`}</span>        
        <span className={`${props.num -1}`}>{props.option}</span>
      </DescriptionBox>
    </OptionCardBox>
  )
}

export default OptionCard;