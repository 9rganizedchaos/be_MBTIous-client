import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface TestAlertContainerProps {
  alertPageX: any;
  alertPageY: any;
  alertContent: string;
}

const TestAlertContainer = styled(motion.div)<TestAlertContainerProps>`
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

function TestAlert({alertPageX, alertPageY, alertContent}: any) {
  return (
    <TestAlertContainer variants={alertVariants} alertContent={alertContent} exit="exit" alertPageX={alertPageX} alertPageY={alertPageY}>
      <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
      <span>{alertContent === "submit" ? "두 옵션 중 하나의 옵션을 선택해주세요!" : alertContent === "pre" ? "가장 첫 질문입니다." : alertContent === "lang" ? "준비중인 서비스 입니다." : "색상이 변경되었습니다."}</span>
    </TestAlertContainer>
  )
}

export default TestAlert;