import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface ArtistAlertContainerProps {
  alertPageX: number;
  alertPageY: number;
}

type tutorialObj = {
  exit: {
    opacity: number;
    transition?: Object;
  }
};

const ArtistAlertContainer = styled(motion.div)<ArtistAlertContainerProps>`
${( { theme, alertPageX, alertPageY } ) => {
  return css`
  position: absolute;
  top: ${alertPageY}px;
  left: ${alertPageX}px;
  width: 15rem;
  height: 4rem;
  transform: translate(-100%, -100%);
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

const alertVariants: tutorialObj = {
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
}

function ArtistAlert({alertPageX, alertPageY}: ArtistAlertContainerProps) {
  return (
    <ArtistAlertContainer variants={alertVariants} exit="exit" alertPageX={alertPageX} alertPageY={alertPageY}>
      <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
      <span>당신의 최애 K팝 걸그룹을 골라주세요!</span>
    </ArtistAlertContainer>
  )
}

export default ArtistAlert;