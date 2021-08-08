import { useRef, useEffect } from "react";
import styled from "styled-components";
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


interface DescriptionBoxProps {
  descriptionBoxObj: any;
}

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

const DescriptionBox1 = styled.div<DescriptionBoxProps>`
width: 100%;
height: calc(100% - 268px);
background-color: ${props => props.descriptionBoxObj.answered && props.descriptionBoxObj.answer === 0 ? "#705DF2" : "#1b1b1b"};
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

const DescriptionBox2 = styled.div<DescriptionBoxProps>`
width: 100%;
height: calc(100% - 268px);
background-color: ${props => props.descriptionBoxObj.answered && props.descriptionBoxObj.answer === 1 ? "#705DF2" : "#1b1b1b"};
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
      { props.num === 1 ? <DescriptionBox1 descriptionBoxObj={props.answers[props.currentTest - 1]} className={`${props.num -1}`} onClick={props.handleOptionClick}>
        <span className={`optionTitle ${props.num -1}`}>{`option${props.num}`}</span>        
        <span className={`${props.num -1}`}>{props.option}</span>
      </DescriptionBox1> : <DescriptionBox2 descriptionBoxObj={props.answers[props.currentTest - 1]} className={`${props.num -1}`} onClick={props.handleOptionClick}>
        <span className={`optionTitle ${props.num -1}`}>{`option${props.num}`}</span>        
        <span className={`${props.num -1}`}>{props.option}</span>
      </DescriptionBox2>

      }
    </OptionCardBox>
  )
}

export default OptionCard;