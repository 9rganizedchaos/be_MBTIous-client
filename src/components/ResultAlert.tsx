import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface ResultAlertContainerProps {
  alertPageX: any;
  alertPageY: any;
}

const ResultAlertContainer = styled(motion.div)<ResultAlertContainerProps>`
${( { theme, alertPageX, alertPageY } ) => {
  return css`
  position: absolute;
  top: ${alertPageY}px;
  left: ${alertPageX}px;
  width: 13rem;
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

function ResultAlert({alertPageX, alertPageY, alertMessage}: any) {
  return (
    <ResultAlertContainer variants={alertVariants} exit="exit" alertPageX={alertPageX} alertPageY={alertPageY}>
      <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
      <span>{alertMessage}</span>
    </ResultAlertContainer>
  )
}

export default ResultAlert;