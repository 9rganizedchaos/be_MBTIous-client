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
import ResultAlert from '../components/ResultAlert';

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

const ComponentBox = styled.div`
${( { theme } ) => {
  return css`
  position: absolute;
  top: 4.5rem;
  left: 1.5rem;
  width: 17rem;
  padding: 0.25rem;
  display: flex;
  flex-flow: wrap;
  `
}}
`

const ComponentTag = styled.div`
${( { theme } ) => {
  return css`
  color: ${theme.color.main};
  border: 2px solid ${theme.color.main};
  height: 2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem; 
  margin: 0.25rem;
  cursor: pointer;
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
cursor: pointer;
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

function ResultPage({handleThemeChange}: any) {
  const testState = useSelector((state: RootState) => state.testReducer);
  const { favoriteArtist } = testState;
  let myKpopGroup = groupsArr.filter((item: any) => item.name === favoriteArtist)[0];

  const constraintsRef = useRef(null);

  const [componentIndex, setComponentIndex] = useState(["alphabet", "girlGroup", "matching", "fitMe", "member", "percent"]);
  const [albumCoverNum, setAlbumCoverNum] = useState(3);
  const [isAlertMessageOpen, setAlertOpen] = useState(false);
  const [alertPageX, setPageX] = useState(0);
  const [alertPageY, setPageY] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

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

  const handleCloseBtn = (closeId: any, e: any) => {
    e.stopPropagation();
    let index = componentIndex.indexOf(closeId);
    let tempArr = componentIndex.slice();
    tempArr.splice(index, 1);
    console.log(tempArr);
    setComponentIndex(tempArr);
  }

  const handleTagClick = (openId: any) => {
    if(componentIndex.includes(openId)){
      return;
    }
    let tempArr = componentIndex.slice();
    tempArr.push(openId);
    setComponentIndex(tempArr);
  }

  const handlePlusTag = (e: any) => {
    if(myKpopGroup.albumCover.length === albumCoverNum){
      setPageX(e.pageX);
      setPageY(e.pageY);
      setAlertMessage("더 이상 추가할 앨범커버가 없습니다.");
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2500);
    } else {
      setAlbumCoverNum(albumCoverNum + 1);
    }
  }

  const handleMinusTag = (e: any) => {
    if(albumCoverNum  === 0){
      setPageX(e.pageX);
      setPageY(e.pageY);
      setAlertMessage("더 이상 삭제할 앨범커버가 없습니다.");
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2500);
    } else {
      setAlbumCoverNum(albumCoverNum - 1);
    }
  }

  return (
    <ResultPageContainer>
      {isAlertMessageOpen ? <ResultAlert alertPageX={alertPageX} alertPageY={alertPageY} alertMessage={alertMessage}/> : null}
      <SettingBar handleThemeChange={handleThemeChange}/>
      <ResultSidebar>
        <Link to="/">
        <Logo>Be_MBTIous</Logo>
        </Link>
        <ComponentBox>
          <ComponentTag>
            <span onClick={() => handleTagClick("member")}>멤버들의 MBTI</span>              
          </ComponentTag>
          <ComponentTag onClick={() => handleTagClick("girlGroup")}>나의 걸그룹 자아</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("alphabet")}>나의 MBTI</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("matching")}>최애그룹과의 궁합</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("fitMe")}>나와 맞는 그룹 & 안 맞는 그룹</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("percent")}>어떤 유형이 내 유형을 좋아할까?</ComponentTag>
          <ComponentTag>
            <span onClick={handlePlusTag}>앨범커버 추가</span>
          </ComponentTag>
          <ComponentTag>
            <span onClick={handleMinusTag}>앨범커버 삭제</span>
          </ComponentTag>
        </ComponentBox>
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
      {myKpopGroup.albumCover.map((item: any, index: number) => {
        if(index > albumCoverNum - 1){
          return;
        }
        return <ResultAlbumCover constraintsRef={constraintsRef} albumCoverUrl={item}></ResultAlbumCover>
      })}
      {componentIndex.includes("fitMe") ? <ResultFitMe handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} fitMeIndex={componentIndex.indexOf("fitMe")} constraintsRef={constraintsRef}/> : null}
      {componentIndex.includes("matching") ? <ResultMatching handleCloseBtn={handleCloseBtn} favoriteArtist={favoriteArtist} handleResultComponentClick={handleResultComponentClick} matchingIndex={componentIndex.indexOf("matching")} constraintsRef={constraintsRef}></ResultMatching> : null}
      {componentIndex.includes("girlGroup") ? <ResultGirlGroup handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} girlGroupIndex={componentIndex.indexOf("girlGroup")} constraintsRef={constraintsRef}/> : null}
      {componentIndex.includes("alphabet") ? <ResultAlphabet handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} alphabetIndex={componentIndex.indexOf("alphabet")} constraintsRef={constraintsRef}></ResultAlphabet> : null }
      {componentIndex.includes("member") ? <ResultMemberMbti handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} memberIndex={componentIndex.indexOf("member")} constraintsRef={constraintsRef}></ResultMemberMbti> : null }
      {componentIndex.includes("percent") ? <ResultPercent handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} percentIndex={componentIndex.indexOf("percent")} constraintsRef={constraintsRef}></ResultPercent> : null }
    </ResultPageContainer>
  )
}

export default withRouter(ResultPage);