import { Fragment } from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
position: fixed;
width: 100vw;
height: 6rem;
background-color: rgba(225, 0, 0, 1);
z-index: 10;
bottom: 0;
`;

function Footer() {
  return (
    <Fragment>
      <FooterContainer>
      </FooterContainer>
    </Fragment>
  )
}

export default Footer;