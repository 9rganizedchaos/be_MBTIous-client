import React, { useRef, useState } from 'react';
import {withRouter} from "react-router";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { motion } from 'framer-motion';
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faComment } from '@fortawesome/free-solid-svg-icons';
import ResultAlbumCover from '../components/ResultAlbumCover';
import ResultAlphabet from '../components/ResultAlphabet';
import ResultGirlGroup from '../components/ResultGirlGroup';
import ResultFitMe from '../components/ResultFitMe';
import ResultMemberMbti from '../components/ResultMemberMbti';
import ResultPercent from '../components/ResultPercent';
import ResultMatching from '../components/ResultMatching';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import SettingBar from '../components/SettingBar';
import ResultAlert from '../components/ResultAlert';
import ResultHeader from '../components/ResultHeader';
import ResultFooter from '../components/ResultFooter';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RouteComponentProps } from 'react-router-dom';


interface ComponentTagProps {
  contain: any;
}

interface Member {
  name: string;
  mbti: string;
}

interface Group {
  name: string;
  code: string;
  mbti: string;
  fitMe: object;
  memeber: Member[];
  albumCover: number;
  slogan: string;
  percent: number;
  description: string[];
}

interface ResultPageProps extends RouteComponentProps {
  handleThemeChange: Function;
  myKpopGroup: Group;
}

const ResultPageContainer = styled.div`
${( { theme } ) => {
  return css`
width: 100vw;
height: 100vh;
background-color: ${theme.color.sub};
border: 0.25rem solid ${theme.color.main};
@media (${theme.size.tablet}) {
  overflow-y: hidden;
  .scrollDiv{
    overflow-y: hidden;
  }
}
@media (${theme.size.mobile}) {
  display: flex;
  flex-direction: column;
  .scrollDiv{
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .scrollDiv::-webkit-scrollbar{
    display: none;
  }
} 
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

const ComponentTag = styled.div<ComponentTagProps>`
${( { theme, contain } ) => {
  return css`
  color: ${contain ? theme.color.sub : theme.color.main};
  border: 2px solid ${theme.color.main};
  background-color: ${contain ? theme.color.main : theme.color.sub};
  height: 2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem; 
  margin: 0.25rem;
  cursor: pointer;
  transition: .1s;
  &:hover {
    font-size: 1.05rem;
  }
  &:active {
    transform: scale(.95);
  }
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
  cursor: pointer;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  color: ${theme.color.sub};
  background-color: ${theme.color.main};
  margin-top: 0.6rem;
  transition: .5s;
  svg {
    font-size: 1.4rem;
  }
  &:hover {
    color: ${theme.color.sub2};
    transform: scale(1.1);
  }
  &:active{
    transform: scale(0.8);
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

function ResultPage({handleThemeChange, myKpopGroup}: ResultPageProps) {
  const testState = useSelector((state: RootState) => state.testReducer);
  const { favoriteArtist } = testState;
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { view } = viewState;

  const constraintsRef = useRef(null);

  const [componentIndex, setComponentIndex] = useState(["alphabet", "fitMe", "member", "percent", "matching", "girlGroup"]);
  const [albumCoverNum, setAlbumCoverNum] = useState(3);
  const [isAlertMessageOpen, setAlertOpen] = useState(false);
  const [alertPageX, setPageX] = useState(0);
  const [alertPageY, setPageY] = useState(0);
  const [alertContent, setAlertContent] = useState("");

  const [labels, setLabels] = useState(['Loading...']);
  const [dataArr, setDataArr] = useState([1]); 

  const handleLangClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setAlertContent("lang");
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 1500);
    setPageX(e.pageX);
    setPageY(e.pageY);
  }

  const handleColorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setAlertContent("color");
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 1500);
    setPageX(e.pageX);
    setPageY(e.pageY);
  }

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

  const saveAs = (uri: string, filename: string) => {
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

  const handleCloseBtn = (closeId: string, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    let index = componentIndex.indexOf(closeId);
    let tempArr = componentIndex.slice();
    tempArr.splice(index, 1);
    setComponentIndex(tempArr);
  }

  const handleTagClick = (openId: string) => {
    if(componentIndex.includes(openId)){
      let tempArr = componentIndex.filter(item => item !== openId);
      setComponentIndex(tempArr);
    } else {
      let tempArr = componentIndex.slice();
      tempArr.push(openId);
      setComponentIndex(tempArr);
    }
  }

  const handlePlusTag = (e: React.MouseEvent<HTMLDivElement>) => {
    if(myKpopGroup.albumCover === albumCoverNum){
      setPageX(e.pageX);
      setPageY(e.pageY);
      setAlertContent("add");
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2500);
    } else {
      setAlbumCoverNum(albumCoverNum + 1);
    }
  }

  const handleCopyBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPageX(e.pageX);
    setPageY(e.pageY);
    setAlertContent("copy");
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 1000);
  }

  const handleMinusTag = (e: React.MouseEvent<HTMLDivElement>) => {
    if(albumCoverNum === 0){
      setPageX(e.pageX);
      setPageY(e.pageY);
      setAlertContent("distract");
      setAlertOpen(true);
      setTimeout(() => {
        setAlertOpen(false);
      }, 2500);
    } else {
      setAlbumCoverNum(albumCoverNum - 1);
    }
  }

  const handleKakaoBtn = () => {
    if(!window.Kakao.isInitialized()){
      window.Kakao.init(process.env.REACT_APP_KAKAO);
    }
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: `나의 걸그룹 자아는 ${myKpopGroup.name} 타입!`,
        description: `${myKpopGroup.slogan}`,
        imageUrl:
          `https://s3.ap-northeast-2.amazonaws.com/mbtious.net/image/kakao_${myKpopGroup.code}.png`,
        link: {
          webUrl: 'https://be.mbtious.net',
          mobileWebUrl: 'https://be.mbtious.net',
          androidExecutionParams: 'test',
        },
      },
      buttons: [
        {
          title: '나의 걸그룹 자아 찾기',
          link: {
            webUrl: 'https://be.mbtious.net',
            mobileWebUrl: 'https://be.mbtious.net',
          },
        },
      ]
    });
  }

  const handleTwitterBtn = () => {
    let sendText = `나의 걸그룹 자아는 ... ${myKpopGroup.name} 타입!`;
    let sendUrl = "be.mbtious.net/";
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }

  const handleFacebookBtn = () => {
    let sendUrl = "be.mbtious.net/";
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }

  return (
    <>
    {view === "mobile" ? 
        <ResultPageContainer>
        <div className="scrollDiv">
        {isAlertMessageOpen ? <ResultAlert alertContent={alertContent} alertPageX={alertPageX} alertPageY={alertPageY} /> : null}
        <SettingBar handleColorClick={handleColorClick} handleLangClick={handleLangClick} handleThemeChange={handleThemeChange}/>
        <ResultHeader/>
        <ResultGirlGroup myKpopGroup={myKpopGroup} handleResultComponentClick={handleResultComponentClick}/>
        <ResultFitMe handleResultComponentClick={handleResultComponentClick}/> 
        <ResultAlphabet handleResultComponentClick={handleResultComponentClick}></ResultAlphabet>
        <ResultMatching favoriteArtist={favoriteArtist} handleResultComponentClick={handleResultComponentClick}></ResultMatching>
        <ResultPercent labels={labels} dataArr={dataArr} setLabels={setLabels} setDataArr={setDataArr} handleResultComponentClick={handleResultComponentClick}></ResultPercent>
        <ResultMemberMbti handleResultComponentClick={handleResultComponentClick}></ResultMemberMbti>
        <ResultFooter handleTwitterBtn={handleTwitterBtn} handleFacebookBtn={handleFacebookBtn} handleKakaoBtn={handleKakaoBtn} handleCopyBtn={handleCopyBtn}></ResultFooter>
        </div>
      </ResultPageContainer> :
      <ResultPageContainer>
      {isAlertMessageOpen ? <ResultAlert alertContent={alertContent} alertPageX={alertPageX} alertPageY={alertPageY}/> : null}
      <SettingBar handleColorClick={handleColorClick} handleLangClick={handleLangClick} handleThemeChange={handleThemeChange}/>
      {view === "mobile" ? null : <ResultSidebar>
        <Link to="/">
        <Logo>Be_MBTIous</Logo>
        </Link>
        <ComponentBox>
          <ComponentTag contain={componentIndex.includes("member")}>
            <span onClick={() => handleTagClick("member")}>멤버들의 MBTI</span>              
          </ComponentTag>
          <ComponentTag onClick={() => handleTagClick("girlGroup")} contain={componentIndex.includes("girlGroup")}>나의 걸그룹 자아</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("alphabet")} contain={componentIndex.includes("alphabet")}>나의 MBTI</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("matching")} contain={componentIndex.includes("matching")}>최애그룹과의 궁합</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("fitMe")} contain={componentIndex.includes("fitMe")}>나와 맞는 그룹 & 안 맞는 그룹</ComponentTag>
          <ComponentTag onClick={() => handleTagClick("percent")} contain={componentIndex.includes("percent")}>어떤 유형이 내 유형을 좋아할까?</ComponentTag>
          <ComponentTag contain={false}>
            <span onClick={handlePlusTag}>앨범커버 추가</span>
          </ComponentTag>
          <ComponentTag contain={false}>
            <span onClick={handleMinusTag}>앨범커버 삭제</span>
          </ComponentTag>
        </ComponentBox>
        <Title>Your Test Result!</Title>
        <ButtonBox>
          <button onClick={handleKakaoBtn}>
            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
          </button>
          <button onClick={handleTwitterBtn}>
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </button>
          <button onClick={handleFacebookBtn}>
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </button>
          <CopyToClipboard text={"https://be.mbtious.net"}>
            <button onClick={handleCopyBtn}>
              <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
            </button>
          </CopyToClipboard>
          <button onClick={handleCaptureBtnClick}>
            <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
          </button>
        </ButtonBox>
      </ResultSidebar> }
      <ResultDragArea ref={constraintsRef}>
      </ResultDragArea>
      { new Array(myKpopGroup.albumCover).fill(0).map((item: number, index: number) => {
        if(index > albumCoverNum - 1){
          return;
        }
        return <ResultAlbumCover constraintsRef={constraintsRef} albumCoverUrl={`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${myKpopGroup.code}${index + 1}.jpeg`}></ResultAlbumCover>
      })}
      {componentIndex.includes("fitMe") ? <ResultFitMe handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} fitMeIndex={componentIndex.indexOf("fitMe")} constraintsRef={constraintsRef}/> : null}
      {componentIndex.includes("matching") ? <ResultMatching handleCloseBtn={handleCloseBtn} favoriteArtist={favoriteArtist} handleResultComponentClick={handleResultComponentClick} matchingIndex={componentIndex.indexOf("matching")} constraintsRef={constraintsRef}></ResultMatching> : null}
      {componentIndex.includes("girlGroup") ? <ResultGirlGroup myKpopGroup={myKpopGroup} handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} girlGroupIndex={componentIndex.indexOf("girlGroup")} constraintsRef={constraintsRef}/> : null}
      {componentIndex.includes("alphabet") ? <ResultAlphabet handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} alphabetIndex={componentIndex.indexOf("alphabet")} constraintsRef={constraintsRef}></ResultAlphabet> : null }
      {componentIndex.includes("member") ? <ResultMemberMbti handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} memberIndex={componentIndex.indexOf("member")} constraintsRef={constraintsRef}></ResultMemberMbti> : null }
      {componentIndex.includes("percent") ? <ResultPercent labels={labels} dataArr={dataArr} setLabels={setLabels} setDataArr={setDataArr} handleCloseBtn={handleCloseBtn} handleResultComponentClick={handleResultComponentClick} percentIndex={componentIndex.indexOf("percent")} constraintsRef={constraintsRef}></ResultPercent> : null }
    </ResultPageContainer>
  }
    </>
  )
}

export default withRouter(ResultPage);