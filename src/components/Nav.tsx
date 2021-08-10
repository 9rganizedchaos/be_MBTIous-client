import { Fragment } from "react";
import styled, { css } from "styled-components";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

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
      .settingBox {
        margin-right: 1rem;
        padding: 0 0.7rem;
        background-color: ${theme.color.sub2};
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          font-weight: 800;
          font-style: italic;
          color: ${theme.color.main};
          font-size: 1.5rem;
        }
      }
    }
  `
}}
`;

function Nav(props: any) {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { color } = viewState;

  return (
    <Fragment>
      <NavContainer>
        <div className="nav__slogan">FIND YOUR KPOP GIRL GROUP EGO AND ...!</div>
        <div className="nav__setting">
          <div onClick={props.handleThemeChange} className="settingBox">
            <span>{color === "violet" ? "PINK MODE" : "VIOLET MODE"}</span>
          </div>
          <div className="settingBox">
            <span>Language</span>
          </div>
        </div>
      </NavContainer>
      </Fragment>
  )
}

export default Nav;