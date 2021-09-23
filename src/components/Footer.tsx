import { Fragment } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { CopyToClipboard } from "react-copy-to-clipboard";

const FooterContainer = styled.div`
${( { theme, color } ) => {
  return css`
position: fixed;
width: 100vw;
height: 10rem;
background-color: ${theme.color.main};
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
    background-color: ${theme.color.sub};
    overflow-x: hidden;
    padding-top: 0.3rem;
    .track {
      position: absolute;
      white-space: nowrap;
      span {
        font-weight: 800;
        font-style: italic;
        margin: 20px 0;
        font-size: 3.5rem;
        color: ${theme.color.main};
        text-transform: uppercase;
        strong {
          margin: 0 1.5rem;
          -webkit-text-fill-color: ${theme.color.sub};
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: ${theme.color.main};
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
      a {
        text-decoration: none;
        color: ${theme.color.sub2};
        transition: .5s;
        &:hover {
          color: ${theme.color.sub};
        }
      }
      cursor: pointer;
      color: ${theme.color.sub2};
      font-weight: 800;
      font-style: italic;
      font-size: 2.5rem;
    }
    .footer__share {
      display: flex;
      flex-direction: row;
      margin-right: 1rem;
      .shareLetter{
        color: ${theme.color.sub2};
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
          background-color: ${theme.color.main};
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
          cursor: pointer;
          width: 5rem;
          background-color: ${theme.color.sub2};
          display: flex;
          justify-content: center;
          align-items: center;
          transition: .5s;
          span {
            font-weight: 800;
            font-style: italic;
            color: ${theme.color.main};
            font-size: 1.5rem;
          }
          &:hover{
            background-color: ${theme.color.sub};
          }
        }
      }
    }
  }
}
.footer__qrcode {
  height: 100%;
  width: 8.75rem;
  background-color: ${theme.color.sub};
  background-image: ${color === "violet" ? `url("https://s3.ap-northeast-2.amazonaws.com/mbtious.net/image/qrcode_violet.jpg")`: `url("https://s3.ap-northeast-2.amazonaws.com/mbtious.net/image/qrcode_pink.jpg")`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
@media (${theme.size.tablet}) {
  }
  @media (${theme.size.mobile}) {
    .footer__main {
      .footer__top {
        height: 3.5rem;
        .track {
          span {
            font-size: 2.5rem;
          }
        }
      }
      .footer__bottom {
        margin-top: 1rem;
        .footer__toGit {
          display: none;
        }
        .footer__share {
          flex-direction: column;
          height: 11rem;
          width: 100vw;
          .shareLetter{
            text-align: right;
            width: 92%;
            margin-top: 1rem;
            font-size: 2rem;
          }
          .shareSearchBox{
            height: 3.5rem;
            width: 95%;
          }
        }
      }
    }
    .footer__qrcode {
      display: none;
    }
  }
`
}}
`;

const marqueeVariants = {
  animate: {
    x: [0, -3500],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 12,
        ease: "linear",
      },
    },
  },
};

function Footer(props: any) {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { color, view } = viewState;

  return (
    <Fragment>
      <FooterContainer color={color}>
        <div className="footer__main">
          <div className="footer__top">
            <motion.div className="track" variants={marqueeVariants} animate="animate">
              <span>BLACKPINK  <strong>ITZY</strong>  TWICE  <strong>REDVELVET</strong>  AESPA  <strong>IZ*ONE</strong>  WJSN  <strong>MOMOLAND</strong>  OHMYGIRL <strong>(G)I-DLE</strong> WEKIMEKI <strong>GFRIEND</strong> LOVELYZ <strong>LOONA</strong> APRIL <strong>MAMAMOO</strong> BLACKPINK  <strong>ITZY</strong>  TWICE  <strong>REDVELVET</strong> AESPA  <strong>IZ*ONE</strong>  WJSN  <strong>MOMOLAND</strong>  OHMYGIRL <strong>(G)I-DLE</strong> WEKIMEKI <strong>GFRIEND</strong> LOVELYZ <strong>LOONA</strong> APRIL <strong>MAMAMOO</strong></span>
            </motion.div>
          </div>
          <div className="footer__bottom">
            <div className="footer__toGit"><a href="https://github.com/9rganizedchaos/be_MBTIous-client" target="_blank" rel="noreferrer">{view === "PC" ? "▶ ▶ to GIT ◀ ◀ ◀ ◀ ◀ ◀" : "▶ to GIT"}</a></div>
            <div className="footer__share">
              <div className="shareSearchBox">
                <div className="address"><span>https://be.mbtious.test</span></div>
                <div className="copy" onClick={(e) => {
                    props.handleCopyBtn(e);
                  }}>
                <CopyToClipboard text={"https://be.mbtious.net"}>
                  <span>Copy</span>
                </CopyToClipboard>
                </div>
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