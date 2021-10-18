import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface ResultAlertContainerProps {
  alertPageX: number;
  alertPageY: number;
}

interface ResultAlertProps extends ResultAlertContainerProps {
  alertContent: string;
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
  z-index: 100;
  font-size: 0.9rem;
  svg {
    color: ${theme.color.main};
    font-size: 1.5rem;
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
    width: 9rem;
    height: 3.25rem;
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

function ResultAlert({alertPageX, alertPageY, alertContent}: ResultAlertProps) {
  return (
    <ResultAlertContainer variants={alertVariants} exit="exit" alertPageX={alertPageX} alertPageY={alertPageY}>
      <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
      <span>{alertContent === "add" ? "더 이상 추가할 커버가 없습니다"  : alertContent=== "distract" ? "제거할 커버가 없습니다.": alertContent=== "copy" ? "링크가 클립보드에 복사되었습니다." : alertContent=== "lang" ? "준비중인 서비스입니다." : "색상이 변경되었습니다."}</span>
    </ResultAlertContainer>
  )
}

export default ResultAlert;