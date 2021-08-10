import { useRef, useState } from 'react';
import {withRouter} from "react-router";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
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
import ResultMemberMbti from '../components/ResultMemberMbti';
import ResultPercent from '../components/ResultPercent';
import ResultMatching from '../components/ResultMatching';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';
import SettingBar from '../components/SettingBar';

const ResultPageContainer = styled.div`
${( { theme } ) => {
  return css`
width: 100vw;
height: 100vh;
background-color: ${theme.color.sub};
border: 0.25rem solid ${theme.color.main};
`
}}
`;

const ResultSidebar = styled.div`
${( { theme } ) => {
  return css`
width: 20rem;
height: 100%;
background-color: ${theme.color.sub};
border-right: 0.25rem solid ${theme.color.main};
`
}}
`;

const Logo = styled.div`
${( { theme } ) => {
  return css`
position: absolute;
left: 0;
color: ${theme.color.main};
font-weight: 800;
font-style: italic;
font-size: 2rem;
margin: 1rem;
`
}}
`;

const Title = styled.div`
${( { theme } ) => {
  return css`
position: absolute;
width: 40rem;
bottom: 19rem;
left: -1.2rem;
color: ${theme.color.main};
font-weight: 800;
font-style: italic;
transform: rotate(270deg);
font-size: 4rem;
`
}}
`

const ButtonBox = styled.div`
${( { theme } ) => {
  return css`
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
  color: ${theme.color.sub};
  background-color: ${theme.color.main};
  margin-top: 0.6rem;
  svg {
    font-size: 1.4rem;
  }
}
`
}}
`;

const ResultDragArea = styled(motion.div)`
${( { theme } ) => {
  return css`
background: ${theme.color.main};
opacity: 0.2;
background: ${theme.color.main};
position: absolute;
width: calc(100% - 20.5rem);
height: calc(100% - 0.5rem);
top: 0.25rem;
left: 20.25rem;
`
}}
`;

function ResultPage(props: any) {
  const testState = useSelector((state: RootState) => state.testReducer);
  const { favoriteArtist } = testState;
  let myKpopGroup = groupsArr.filter((item: any) => item.name === favoriteArtist)[0];

  const constraintsRef = useRef(null);

  const [componentIndex, setComponentIndex] = useState(["alphabet", "fitMe", "girlGroup", "matching", "member", "percent"]);

  const handleResultComponentClick = (e: any) => {
    let clickedClassName;
    if(typeof e.target.className !== "string"){
      clickedClassName = "matching";
    } else {
      let classNameArr = e.target.className.split(" ");
      let lastIndex = classNameArr.length - 1;
      clickedClassName = classNameArr[lastIndex];
    }

    let newComponentIndex = componentIndex.slice();
    let index = componentIndex.indexOf(clickedClassName);
    newComponentIndex.splice(index, 1); 
    newComponentIndex.push(clickedClassName);
    setComponentIndex(newComponentIndex);
  }

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
      <SettingBar handleThemeChange={props.handleThemeChange}/>
      <ResultSidebar>
        <Link to="/">
        <Logo>Be_MBTIous</Logo>
        </Link>
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
          <button onClick={handleCaptureBtnClick}>
            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
          </button>
        </ButtonBox>
      </ResultSidebar>
      <ResultDragArea ref={constraintsRef}>
      </ResultDragArea>
      {myKpopGroup.albumCover.map((item: any) => {
        return <ResultAlbumCover constraintsRef={constraintsRef} albumCoverUrl={item}></ResultAlbumCover>
      })}
      <ResultFitMe handleResultComponentClick={handleResultComponentClick} fitMeIndex={componentIndex.indexOf("fitMe")} constraintsRef={constraintsRef}/>
      <ResultMatching handleResultComponentClick={handleResultComponentClick} matchingIndex={componentIndex.indexOf("matching")} constraintsRef={constraintsRef}></ResultMatching>
      <ResultGirlGroup handleResultComponentClick={handleResultComponentClick} girlGroupIndex={componentIndex.indexOf("girlGroup")} constraintsRef={constraintsRef}/>
      <ResultAlphabet handleResultComponentClick={handleResultComponentClick} alphabetIndex={componentIndex.indexOf("alphabet")} constraintsRef={constraintsRef}></ResultAlphabet>
      <ResultMemberMbti handleResultComponentClick={handleResultComponentClick} memberIndex={componentIndex.indexOf("member")} constraintsRef={constraintsRef}></ResultMemberMbti>
      <ResultPercent handleResultComponentClick={handleResultComponentClick} percentIndex={componentIndex.indexOf("percent")} constraintsRef={constraintsRef}></ResultPercent>
    </ResultPageContainer>
  )
}

export default withRouter(ResultPage);