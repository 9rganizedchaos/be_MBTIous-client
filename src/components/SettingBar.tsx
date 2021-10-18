import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { updateSettingBar } from '../action/actions';

interface SettingBarProps {
  handleThemeChange: Function;
  handleColorClick: React.MouseEventHandler;
  handleLangClick: React.MouseEventHandler;
}

interface SettingBarContainerProps {
  settingBar: boolean;
}

const SettingBarContainer = styled(motion.div)<SettingBarContainerProps>`
${( { theme, settingBar } ) => {
  return css`
  position: absolute;
  bottom: ${settingBar ? 0 : "-3.75rem"};
  left: 75%;
  display: flex;
  z-index: 50;
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
      cursor: pointer;
      transition: .5s;
      &:hover{
        background-color: ${theme.color.main};
        color: ${theme.color.sub};
      }
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
      cursor: pointer;
      color: ${theme.color.main};
      font-style: italic;
      font-weight: 800;
      font-size: 1.25rem;
      padding: 0.25rem;
      transition: .5s;
      &:hover{
        background-color: ${theme.color.main};
        color: ${theme.color.sub};
      }
    }
  }
  @media (${theme.size.tablet}) {
    bottom: ${settingBar ? 0 : "-3.75rem"};
    left: 70%;
    .settingBtn {
      width: 14rem;
      div{
        width: 2rem;
        height: 1.25rem;
        color: ${theme.color.main};
        font-size: 1.25rem;
      }
    }
    .settingMain {
      width: 16rem;
      height: 4rem;
      span {
        font-size: 1.125rem;
      }
    }
  }
  @media (${theme.size.mobile}) {
    bottom: ${settingBar ? 0 : "-2.75rem"};
    left: 45%;
    .settingBtn {
      width: 10rem;
      div{
        width: 2rem;
        height: 1.25rem;
        color: ${theme.color.main};
        font-size: 1.25rem;
      }
    }
    .settingMain {
      width: 11rem;
      height: 3rem;
      span {
        font-size: 0.75rem;
      }
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

function SettingBar({ handleThemeChange, handleColorClick, handleLangClick }: SettingBarProps) {
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
        <div className="colorSettingBar" onClick={(e) => {
          handleColorClick(e)
          handleThemeChange(e)
          }}>
          <span>{color === "violet" ? "PinkMode" : "VioletMode" }</span>
        </div>
        <div className="languageSettingBar" onClick={handleLangClick}>
          <span>ENGLISH</span>
        </div>
      </div>     
    </SettingBarContainer>
  )
}

export default SettingBar;