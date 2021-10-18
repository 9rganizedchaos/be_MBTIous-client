import { Fragment } from "react";
import styled, { css } from "styled-components";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface NavProps { 
  handleThemeChange: Function;
  handleColorChange: Function;
  handleLanguageChange: Function;
}

const NavContainer = styled.div`
${( { theme } ) => {
  return css`
    position: fixed;
    width: 100vw;
    height: 4rem;
    background-color: ${theme.color.main};
    z-index: 10;
    top: 0;
    display: flex;
    justify-content: space-between;
    .nav__slogan {
      margin: 0.9rem 0.7rem 0.7rem 1rem;
      font-weight: 800;
      font-style: italic;
      font-size: 2.1rem;
      color: ${theme.color.sub};
    }
    .nav__setting{
      margin: 0.7rem 0 0 0.7rem;
      display: flex;
      flex-direction: row;
      .color {
        width: 11rem;
      }
      .language {
        width: 8rem;
      }
      .settingBox {
        cursor: pointer;
        margin-right: 1rem;
        padding: 0 0.7rem;
        background-color: ${theme.color.sub2};
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          cursor: pointer;
          font-weight: 800;
          font-style: italic;
          color: ${theme.color.main};
          font-size: 1.5rem;
        }
        &:hover{
          background-color: ${theme.color.sub};
        }
        &:active{
          transform: scale(0.97);
        }
      }
    }
    @media (${theme.size.tablet}) {
      .nav__slogan {
        font-size: 1.75rem;
        display: flex;
        align-items: center;
      }
    }
    @media (${theme.size.mobile}) {
      justify-content: flex-end;
      .nav__slogan {
        display: none;
      }
      .nav__setting{
      .settingBox {
        span{
          font-size: 1.25rem;
        }
      }
    }
    }
  `
}}
`;

function Nav(props: NavProps) {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { color } = viewState;

  return (
    <Fragment>
      <NavContainer>
        <div className="nav__slogan">FIND YOUR KPOP GIRL GROUP EGO AND ...!</div>
        <div className="nav__setting">
          <div onClick={(e) => {
            props.handleThemeChange();
            props.handleColorChange(e);
          }} className="settingBox color">
            <span>{color === "violet" ? "PINK MODE" : "VIOLET MODE"}</span>
          </div>
          <div className="settingBox language" onClick={(e) => {
            props.handleLanguageChange(e);
          }}>
            <span>Language</span>
          </div>
        </div>
      </NavContainer>
      </Fragment>
  )
}

export default Nav;