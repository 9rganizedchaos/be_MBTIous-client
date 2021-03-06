import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import groupsArr from '../assets/groups';
import ResultCloseBtn from './ResultCloseBtn';
import { MutableRefObject, useState } from 'react';

interface ResultMemberMbti {
  handleResultComponentClick: React.MouseEventHandler;
  memberIndex?: number;
  constraintsRef?: MutableRefObject<null>;
  handleCloseBtn?: any;
}

interface MemberCardProps {
  className: string;
  name: string;
  mbti: string;
}

interface MemberContainerProps {
  memberIndex?: number;
}

const GroupMemberWholeContainer = styled(motion.div)<MemberContainerProps>`
${( { theme, memberIndex } ) => {
  return css`
z-index: ${memberIndex};
background: ${theme.color.sub};
width: 600px;
height: 210px;
position: absolute;
top: 90px;
left: 1000px;
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
border: 3px solid ${theme.color.main};
display: flex;
flex-direction: row;
.memberTitle{
  background-color: ${theme.color.sub};
  color: ${theme.color.main};
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 1rem;
  width: 150px;
  border-right: 3px solid ${theme.color.main};
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  border: none;
  border-bottom: 3px solid ${theme.color.sub};
}
`
}}
`

const ResultMemberMbtiContainer = styled(motion.div)`
${( { theme } ) => {
  return css`
display: flex;
overflow-x: scroll;
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: ${theme.color.sub};
  border: 2px solid ${theme.color.main};
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background-color: ${theme.color.main};
  width: 100px;
}
.sourceInformation{
  width: 200px;
  background-color: ${theme.color.sub};
  display: flex; 
  justify-content: center;
  align-items: center;
  div {
    background-color: ${theme.color.main};
    width: 100px;
    color: ${theme.color.sub};
    padding: 0.5rem;
    margin: 1rem;
    text-align: center;
    font-size: 0.75rem;
    strong{
      font-size: 2rem;
    }
  }
}
`
}}
`;

const MemberCardContainer = styled.div`
${( { theme } ) => {
  return css`
display: flex;
flex-direction: column;
border-right: 3px solid ${theme.color.main};
.memberCardName {
  height: 150px;
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 2.4rem;
    color: ${theme.color.main};
  }
}
.memberCardMBTI {
  border-top: 3px solid ${theme.color.main};
  background-color: ${theme.color.main};
  color: ${theme.color.sub};
  height: 40px;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  border-bottom: 5px solid ${theme.color.main};
}
`
}}
`;

const MemberCard = function(props: MemberCardProps) {
  return (
    <MemberCardContainer className="member">
      <div className="memberCardName member">
        <span className="member">{props.name}</span>
      </div>
      <div className="memberCardMBTI member">
        <span className="member">{props.mbti}</span>
      </div>
    </MemberCardContainer>
  )
}

const ResultMemberMbti = function(props: ResultMemberMbti){
  const testState = useSelector((state: RootState) => state.testReducer);
  const { result } = testState;
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { view } = viewState;
  const [mouseIn, setMouseIn] = useState(false);

  let myMBTI = result.mbti;
  let myKpopGroup = groupsArr.filter((item: any) => item.mbti === myMBTI);
  let myMembers = myKpopGroup[0].member

  return (
    <>{view === "mobile" ?
    <GroupMemberWholeContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="member" onClick={props.handleResultComponentClick}>
    <div className="memberTitle member">
      <span className="member">{myKpopGroup[0].name}<br/> ???????????? MBTI</span>
    </div>
    <ResultMemberMbtiContainer className="member">
      {myMembers.map((item: any, index: number) => 
        <MemberCard className="member" key={index} name={item.name} mbti={item.mbti}/>
      )}
      <div className="sourceInformation member">
        <div className="member"><strong className="member">???</strong><br/>?????????????????????<br/> ????????? ?????????<br/> ???????????? ?????????<br/> ?????? ??? ????????????.</div>
      </div>
    </ResultMemberMbtiContainer>    
    </GroupMemberWholeContainer> :
        <GroupMemberWholeContainer onMouseOver={()=>{setMouseIn(true)}} onMouseLeave={() => setMouseIn(false)} className="member" onClick={props.handleResultComponentClick} memberIndex={props.memberIndex} drag dragConstraints={props.constraintsRef}>
        {mouseIn ? <ResultCloseBtn closeId={"member"} handleCloseBtn={props.handleCloseBtn}/> : null}
        <div className="memberTitle member">
          <span className="member">{myKpopGroup[0].name}<br/> ???????????? MBTI</span>
        </div>
        <ResultMemberMbtiContainer className="member">
          {myMembers.map((item: any, index: number) => 
            <MemberCard className="member" key={index} name={item.name} mbti={item.mbti}/>
          )}
          <div className="sourceInformation member">
            <div className="member"><strong className="member">???</strong><br/>?????????????????????<br/> ????????? ?????????<br/> ???????????? ?????????<br/> ?????? ??? ????????????.</div>
          </div>
        </ResultMemberMbtiContainer>    
        </GroupMemberWholeContainer>
        }
    </>
  )
}

export default ResultMemberMbti ;