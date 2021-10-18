import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface LandingAlertProps {
  alertPageX: number;
  alertPageY: number;
  alertMessage: string;
  alertIcon: string;
}

interface LandingAlertContainerProps {
  alertPageX: number;
  alertPageY: number;
}

interface VariantsProps {
  exit: {
    opacity: number;
    transition: {
      ease: string;
    }
  }
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
  @media (${theme.size.tablet}) {
  }
  @media (${theme.size.mobile}) {
    font-size: 0.75rem;
    width: 8rem;
    height: 3rem;
    svg {
      font-size: 1.25rem;
      margin: 0.5rem;
    }
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

function LandingAlert({alertPageX, alertPageY, alertMessage, alertIcon}: LandingAlertProps) {
  return (
    <LandingAlertContainer variants={alertVariants} exit="exit" alertPageX={alertPageX} alertPageY={alertPageY}>
      <FontAwesomeIcon icon={alertIcon === "info"? faInfoCircle :faExclamationTriangle}></FontAwesomeIcon>
      <span>{alertMessage}</span>
    </LandingAlertContainer>
  )
}

export default LandingAlert;