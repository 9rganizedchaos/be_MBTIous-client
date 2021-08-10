import { faMousePointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from "styled-components";

const CircleContainer = styled.div`
${( { theme } ) => {
  return css`
position: absolute;
width: 20rem;
height: 20rem;
border-radius: 50%;
background-color: ${theme.color.main};
top: 50%;
left: 50%;
transform: translate(-50%, -50%); 
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
.fa-mouse-pointer {
  font-size: 5rem;
}
.circle__description {
  margin: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 800;
  font-style: italic;
}
`
}}
`

function TutorialCircle() {
  return (
    <CircleContainer>
      <FontAwesomeIcon icon={faMousePointer}></FontAwesomeIcon>
      <div className="circle__description">You can control <br/> this background image<br/> by using mouse scrolling<br/> and drag&drop!</div>
    </CircleContainer>
  )
}

export default TutorialCircle;