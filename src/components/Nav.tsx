import { Fragment } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

const NavContainer = styled.div`
position: fixed;
width: 100vw;
height: 4rem;
background-color: #705DF2;
z-index: 10;
top: 0;
display: flex;
justify-content: space-between;
.nav__slogan {
  margin: 0.9rem 0.7rem 0.7rem 1rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  font-style: italic;
  font-size: 2.1rem;
  color: #1b1b1b;
}
.nav__setting{
  margin: 0.7rem 0 0 0.7rem;
  display: flex;
  flex-direction: row;
  .settingBox {
    margin-right: 1rem;
    padding: 0 0.7rem;
    background-color: white;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      font-family: 'Roboto', sans-serif;
      font-weight: 800;
      font-style: italic;
      color: #705DF2;
      font-size: 1.5rem;
    }
  }
}
`;

function Nav() {
  return (
    <Fragment>
      <NavContainer>
        <div className="nav__slogan">FIND YOUR KPOP GIRL GROUP EGO AND ...!</div>
        <div className="nav__setting">
          <div className="settingBox">
            <span>DarkMode</span>
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