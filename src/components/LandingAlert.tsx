import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfo } from '@fortawesome/free-solid-svg-icons';

interface LandingAlertContainerProps {
  alertPageX: any;
  alertPageY: any;
}

const LandingAlertContainer = styled(motion.div)<LandingAlertContainerProps>`
${( { theme, alertPageX, alertPageY } ) => {
  return css`
  position: absolute;
  top: ${alertPageY}px;
  left: ${alertPageX}px;
  width: 13rem;
  height: 4rem;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  background-color: ${theme.color.sub};
  border: 3px solid ${theme.color.main};
  z-index: 100;
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

function LandingAlert({alertPageX, alertPageY, alertMessage, alertIcon}: any) {
  return (
    <LandingAlertContainer variants={alertVariants} exit="exit" alertPageX={alertPageX} alertPageY={alertPageY}>
      <FontAwesomeIcon icon={alertIcon === "info"? faInfo :faExclamationTriangle}></FontAwesomeIcon>
      <span>{alertMessage}</span>
    </LandingAlertContainer>
  )
}

export default LandingAlert;