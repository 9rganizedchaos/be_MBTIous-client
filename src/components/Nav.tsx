import { Fragment } from "react";
import styled from "styled-components";

const NavContainer = styled.div`
position: fixed;
width: 100vw;
height: 3rem;
background-color: rgba(225, 0, 0, 1);
z-index: 10;
top: 0;
`;

function Nav() {
  return (
    <Fragment>
      <NavContainer>
      </NavContainer>
      </Fragment>
  )
}

export default Nav;