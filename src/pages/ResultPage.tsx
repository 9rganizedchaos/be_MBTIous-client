import { useRef } from 'react';
import {withRouter} from "react-router";
import styled from "styled-components";
import { motion } from 'framer-motion';
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import ResultAlbumCover from '../components/ResultAlbumCover';
import ResultAlphabet from '../components/ResultAlphabet';
import ResultGirlGroup from '../components/ResultGirlGroup';
import ResultFitMe from '../components/ResultFitMe';

const ResultPageContainer = styled.div`
width: 100vw;
height: 100vh;
background-color: #1b1b1b;
border: 0.25rem solid #705DF2;
`;

const ResultSidebar = styled.div`
width: 20rem;
height: 100%;
background-color: #1b1b1b;
border-right: 0.25rem solid #705DF2;
`;

const Logo = styled.div`
position: absolute;
left: 0;
color: #705DF2;
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
font-size: 2rem;
margin: 1rem;
`;

const Title = styled.div`
position: absolute;
width: 40rem;
bottom: 19rem;
left: -1.2rem;
color: #705DF2;
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
transform: rotate(270deg);
font-size: 4rem;
`

const ButtonBox = styled.div`
position: absolute;
bottom: 1.25rem;
display: flex;
flex-direction: column;
left: 1.25rem;
button{
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #705DF2;
  margin-top: 0.6rem;
  svg {
    font-size: 1.4rem;
  }
}
`;

const ResultDragArea = styled(motion.div)`
background: #705DF2;
opacity: 0.2;
background: #705DF2;
position: absolute;
width: calc(100% - 20rem);
height: calc(100% - 0.5rem);
top: 0.25rem;
left: 20.25rem;
`;

const DragComponent = styled(motion.div)`
background: #1b1b1b;
border-radius: 30px;
width: 150px;
height: 150px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
`

function ResultPage() {
  const constraintsRef = useRef(null);

  const handleCaptureBtnClick = () => {
    html2canvas(document.body).then((canvas) => {
      saveAs(canvas.toDataURL('image/png'),"capture-test.png");
    });
  }

  const saveAs = (uri: any, filename: any) => {
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } else {
    window.open(uri);
    }
  }

  return (
    <ResultPageContainer>
      <ResultSidebar>
        <Logo>Be_MBTIous</Logo>
        <Title>Your Test Result!</Title>
        <ButtonBox>
          <button>
            <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
          </button>
          <button>
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </button>
          <button>
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </button>
          <button>
            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
          </button>
          <button>
            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
          </button>
        </ButtonBox>
      </ResultSidebar>
      <ResultDragArea ref={constraintsRef}/>
      
      <ResultAlbumCover constraintsRef={constraintsRef} albumCoverUrl={"https://i.imgur.com/qA2fWVp.png"}></ResultAlbumCover>
      <ResultAlbumCover constraintsRef={constraintsRef} albumCoverUrl={"https://i.imgur.com/IoheE2j.jpg"}></ResultAlbumCover>
      <ResultAlbumCover constraintsRef={constraintsRef} albumCoverUrl={"https://i.imgur.com/IK7k6ch.jpg"}></ResultAlbumCover>
      <ResultFitMe constraintsRef={constraintsRef}/>
      <ResultGirlGroup constraintsRef={constraintsRef}/>
      <ResultAlphabet constraintsRef={constraintsRef}></ResultAlphabet>
    </ResultPageContainer>
  )
}

export default withRouter(ResultPage);