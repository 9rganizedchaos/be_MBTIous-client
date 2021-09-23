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
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  height: calc(100% - 4rem);
}
`
}}
`;

const ImageBox = styled.div`
${( { theme } ) => {
  return css`
width: 100%;
height: 268px;
border-bottom: 0.25rem solid ${theme.color.main};
.imageBox_image{
  width: 100%;
  height: 100%;
  opacity: .5;
  background-size: cover;
  background-position: center;
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  height: 188px;
}
`}}
`;

const DescriptionBox1 = styled.div<DescriptionBoxProps>`
${( { theme,  descriptionBoxObj } ) => {
  return css`
  cursor: pointer;
width: 100%;
height: calc(100% - 268px);
background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.main : theme.color.sub};
color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.sub : theme.color.main};
-webkit-text-decoration: underline;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 1.125rem;
transition: .1s;
span {
  padding: 0.125rem 0.5rem;
  margin: 0.125rem;
  background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.sub : theme.color.main};
  text-align: center;
  color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 0 ? theme.color.main : theme.color.sub};
}
.optionTitle{
  font-size: 1.3rem;
  font-weight: 800;
  font-style: italic;
  margin-bottom: 0.5rem;
}
&:hover{
  font-size: 1.15rem;
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  .optionTitle{
    font-size: 1.125rem;
  }
  height: calc(100% - 188px);
  span {
    font-size: 0.7rem;
  }
}
`
}}
`

const DescriptionBox2 = styled.div<DescriptionBoxProps>`
${( { theme,  descriptionBoxObj} ) => {
  return css`
  cursor: pointer;
width: 100%;
height: calc(100% - 268px);
background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.main : theme.color.sub};
color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.sub : theme.color.main};
-webkit-text-decoration: underline;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 1.125rem;
transition: .1s;
span {
  padding: 0.125rem 0.5rem;
  margin: 0.125rem;
  background-color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.sub : theme.color.main};
  text-align: center;
  color: ${descriptionBoxObj.answered && descriptionBoxObj.answer === 1 ? theme.color.main : theme.color.sub};
}
.optionTitle{
  font-size: 1.3rem;
  font-weight: 800;
  font-style: italic;
  margin-bottom: 0.5rem;
}
&:hover{
  font-size: 1.15rem;
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  height: calc(100% - 188px);
  .optionTitle{
    font-size: 1.125rem;
  }
  span {
    font-size: 0.7rem;
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
      <ImageBox>
        <div className="imageBox_image" ref={imageBox}></div>
      </ImageBox>
      { props.num === 1 ? <DescriptionBox1 descriptionBoxObj={props.answers[props.currentTest - 1]} className={`${props.num -1}`} onClick={props.handleOptionClick}>
        <span className={`optionTitle ${props.num -1}`}>{`option${props.num}`}</span>     
        {props.option.map((item: string, index: number) => {
          return <span key={index} className={`${props.num -1}`}>{item}</span>
        })}
      </DescriptionBox1> : <DescriptionBox2 descriptionBoxObj={props.answers[props.currentTest - 1]} className={`${props.num -1}`} onClick={props.handleOptionClick}>
        <span className={`optionTitle ${props.num -1}`}>{`option${props.num}`}</span>        
        {props.option.map((item: string, index: number) => {
          return <span key={index} className={`${props.num -1}`}>{item}</span>
        })}
      </DescriptionBox2>
      }
    </OptionCardBox>
  )
}

export default OptionCard;