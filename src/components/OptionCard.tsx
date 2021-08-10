import { useRef, useEffect } from "react";
import styled, { css } from "styled-components";


interface DescriptionBoxProps {
  descriptionBoxObj: any;
}

const OptionCardBox = styled.div`
${( { theme } ) => {
  return css`
width: 100%;
height: calc(100% - 5rem);
background-color: ${theme.color.sub};
`
}}
`;

const ImageBox = styled.div`
${( { theme } ) => {
  return css`
width: 100%;
height: 268px;
border-bottom: 0.25rem solid ${theme.color.main};
background-size: cover;
`}}
`;

const DescriptionBox1 = styled.div<DescriptionBoxProps>`
${( { theme,  descriptionBoxObj} ) => {
  return css`
width: 100%;
height: calc(100% - 268px);
background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.main : theme.color.sub};
color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.sub : theme.color.main};
-webkit-text-decoration: underline;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
span {
  width: 90%;
  padding: 0.25rem;
  font-size: 1.125rem;
  background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.sub : theme.color.main};
  text-align: center;
  color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.main : theme.color.sub};
}
.optionTitle{
  width: 35%;
  margin-bottom: 0.5rem;
}
}
`
}}
`

const DescriptionBox2 = styled.div<DescriptionBoxProps>`
${( { theme,  descriptionBoxObj} ) => {
  return css`
width: 100%;
height: calc(100% - 268px);
background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.main : theme.color.sub};
color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.sub : theme.color.main};
-webkit-text-decoration: underline;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
span {
  width: 90%;
  padding: 0.25rem;
  font-size: 1.125rem;
  background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.sub : theme.color.main};
  text-align: center;
  color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.main : theme.color.sub};
}
.optionTitle{
  width: 35%;
  margin-bottom: 0.5rem;
}
}
`
}}
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