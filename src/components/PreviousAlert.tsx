import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface PreviousAlertContainerProps {
  alertPageX: any;
  alertPageY: any;
}

const PreviousAlertContainer = styled(motion.div)<PreviousAlertContainerProps>`
${( { theme, alertPageX, alertPageY } ) => {
  return css`
  position: absolute;
  top: ${alertPageY}px;
  left: ${alertPageX}px;
  width: 15rem;
  height: 4rem;
  transform: translate(-50%, -100%);
  display: flex;
  align-items: center;
  background-color: ${theme.color.sub};
  border: 3px solid ${theme.color.main};
  z-index: 3;
  svg {
    color: ${theme.color.main};
    font-size: 1.75rem;
    margin: 1rem;
  }
  span {
    color: ${theme.color.main};
    margin: 0.5rem;
    margin-left: 0;
  }
  `
}}
`

const alertVariants: any = {
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
}

function PreviousAlert({alertPageX, alertPageY}: any) {
  return (
    <PreviousAlertContainer variants={alertVariants} exit="exit" alertPageX={alertPageX} alertPageY={alertPageY}>
      <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
      <span>가장 첫 질문입니다.</span>
    </PreviousAlertContainer>
  )
}

export default PreviousAlert;