import { Fragment } from "react";
import styled from "styled-components";
import { motion } from "framer-motion"

const FooterContainer = styled.div`
position: fixed;
width: 100vw;
height: 10rem;
background-color: #705DF2;
z-index: 10;
bottom: 0;
padding: 0.7rem;
display: flex;
.footer__main {
  flex: 1 1 auto;
  margin-right: 0.7rem;
  .footer__top {
    position: relative;
    height: 4.75rem;
    width: 100%;
    background-color: #1b1b1b;
    overflow-x: hidden;
    padding-top: 0.3rem;
    .track {
      position: absolute;
      white-space: nowrap;
      span {
        font-family: 'Roboto', sans-serif;
        font-weight: 800;
        font-style: italic;
        margin: 20px 0;
        font-size: 3.5rem;
        color: #705DF2;
        text-transform: uppercase;
        strong {
          margin: 0 1.5rem;
          -webkit-text-fill-color: #1b1b1b;
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: #705DF2;
        }
      }
    }
  }
  .footer__bottom {
    width: 100%;
    height: 3rem;
    margin: 0.7rem 0;
    display: flex;
    justify-content: space-between;
    .footer__toGit {
      color: white;
      font-family: 'Roboto', sans-serif;
      font-weight: 800;
      font-style: italic;
      font-size: 2.5rem;
    }
    .footer__share {
      display: flex;
      flex-direction: row;
      margin-right: 1rem;
      .shareLetter{
        color: white;
        font-family: 'Roboto', sans-serif;
        font-weight: 800;
        font-style: italic;
        font-size: 2.5rem;
      }
      .shareSearchBox{
        margin-right: 1rem;
        border: 1px white solid;
        display: flex;
        flex-direction: row;
        .address{
          width: 20rem;
          font-family: 'Roboto', sans-serif;
          background-color: #705DF2;
          display: flex;
          justify-content: left;
          align-items: center;
          span {
            margin-left: 1rem;
            font-style: italic;
            font-size: 1.25rem;
            color: white;
          }
        }
        .copy {
          width: 5rem;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-family: 'Roboto', sans-serif;
            font-weight: 800;
            font-style: italic;
            color: #705DF2;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}
.footer__qrcode {
  height: 100%;
  width: 10rem;
  background-color: #1b1b1b;
}
`;

const marqueeVariants = {
  animate: {
    x: [0, -1000],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 4,
        ease: "linear",
      },
    },
  },
};

function Footer() {
  return (
    <Fragment>
      <FooterContainer>
        <div className="footer__main">
          <div className="footer__top">
            <motion.div className="track" variants={marqueeVariants} animate="animate">
              <span>#BLACKPINK  <strong>#ITZY</strong>  #TWICE  <strong>#REDVELVET</strong>  #AESPA  <strong>#IZ*ONE</strong>  #2NE1  <strong>#Fx</strong>  #OHMYGIRL</span>
            </motion.div>
          </div>
          <div className="footer__bottom">
            <div className="footer__toGit"> ▶ ▶ to GIT ◀ ◀ ◀ ◀ ◀ ◀</div>
            <div className="footer__share">
              <div className="shareSearchBox">
                <div className="address"><span>https://be.mbtious.test</span></div>
                <div className="copy"><span>Copy</span></div>
              </div>
              <div className="shareLetter">& SHARE!</div>
            </div>
          </div>
        </div>
        <div className="footer__qrcode"></div>
      </FooterContainer>
    </Fragment>
  )
}

export default Footer;