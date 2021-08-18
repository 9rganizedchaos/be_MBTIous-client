import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { updateSettingBar } from '../action/actions';
import { calculateBorderBoxPath } from 'html2canvas/dist/types/render/bound-curves';

interface SettingBarContainerProps {
  settingBar: any;
}


const SettingBarContainer = styled(motion.div)<SettingBarContainerProps>`
${( { theme, settingBar } ) => {
  return css`
  position: absolute;
  bottom: ${settingBar ? 0 : "-3.75rem"};
  left: 75%;
  display: flex;
  z-index: 10;
  width: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: .5s;
  .settingBtn {
    width: 18rem;
    display: flex;
    justify-content: flex-end;
    div {
      width: 3rem;
      height: 2rem;
      color: ${theme.color.main};
      background-color: ${theme.color.sub};
      border: 0.2rem solid ${theme.color.main};
      border-bottom: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.75rem;
    }
  }
  .settingMain {
    background-color: ${theme.color.sub};
    border: 0.25rem solid ${theme.color.main};
    border-bottom: none;
    width: 20rem;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    div {
      width: 9rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    span {
      color: ${theme.color.main};
      font-style: italic;
      font-weight: 800;
      font-size: 1.25rem;
    }
  }
  `
}}
`

const settingVariants: any = {
  hidden: {
    x: "-100vh"
  },
  visible: {
    x: "0",
    transition: { delay: 0.25, duration: 1 },
  },
  exit: {
    x: "0",
    transition: { ease: "easeInOut" },
  },
}

function SettingBar({ handleThemeChange }: any) {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { settingBar, color } = viewState;
  const dispatch = useDispatch();

  const handleSettingBarClick = () => {
    dispatch(updateSettingBar(settingBar ? false : true));
  }

  return (
    <SettingBarContainer settingBar={settingBar} variants={settingVariants}>
      <div className="settingBtn">
        <div onClick={handleSettingBarClick}>
        {settingBar ? <FontAwesomeIcon icon={faCaretDown}/> : <FontAwesomeIcon icon={faCaretUp}/>}
        </div>
      </div>
      <div className="settingMain">
        <div className="colorSettingBar" onClick={handleThemeChange}>
          <span>{color === "violet" ? "VioletMode" : "PinkMode" }</span>
        </div>
        <div className="languageSettingBar">
          <span>ENGLISH</span>
        </div>
      </div>     
    </SettingBarContainer>
  )
}

export default SettingBar;