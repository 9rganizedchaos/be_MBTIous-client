import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from "styled-components";

const CloseBtnContainer = styled.div`
${( { theme } ) => {
  return css`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${theme.color.main};
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    color: ${theme.color.sub};
  }
`
}}
`;

function ResultCloseBtn(props: any){
  return(
    <CloseBtnContainer onClick={(e) => props.handleCloseBtn(props.closeId, e)}>
      <FontAwesomeIcon icon={faTimes}/>
    </CloseBtnContainer>
  )
}

export default ResultCloseBtn;