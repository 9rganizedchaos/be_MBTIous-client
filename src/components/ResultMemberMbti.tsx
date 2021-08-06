import styled from 'styled-components'
import { motion } from "framer-motion";

let girlGroupMemberArr = [
  {name: "Yeri", mbti: "INFP"},
  {name: "Wendy", mbti: "ISFP"},
  {name: "Seulgi", mbti: "ISFP"},
  {name: "Irene", mbti: "ENTJ"},
  {name: "Joy", mbti: "INFP"},
];

const GroupMemberWholeContainer = styled(motion.div)`
background: #1b1b1b;
width: 600px;
height: 210px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-style: italic;
border: 3px solid #705DF2;
display: flex;
flex-direction: row;
.memberTitle{
  background-color: #1b1b1b;
  color: #705DF2;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 1rem;
  width: 150px;
  border-right: 3px solid #705DF2;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

const ResultMemberMbtiContainer = styled(motion.div)`
display: flex;
overflow-x: scroll;
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #1b1b1b;
  border: 2px solid #705DF2;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  background-color: #705DF2;
  width: 100px;
}
.sourceInformation{
  width: 200px;
  background-color: #1b1b1b;
  display: flex; 
  justify-content: center;
  align-items: center;
  div {
    background-color: #705DF2;
    width: 100px;
    color: #1b1b1b;
    padding: 0.5rem;
    margin: 1rem;
    text-align: center;
    font-size: 0.75rem;
    strong{
      font-size: 2rem;
    }
  }
}
`;

const MemberCardContainer = styled.div`
display: flex;
flex-direction: column;
border-right: 3px solid #705DF2;
.memberCardName {
  height: 150px;
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 3rem;
    color: #705DF2;
  }
}
.memberCardMBTI {
  border-top: 3px solid #705DF2;
  background-color: #705DF2;
  color: #1b1b1b;
  height: 40px;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

const MemberCard = function(props: any): any {
  return (
    <MemberCardContainer>
      <div className="memberCardName">
        <span>{props.name}</span>
      </div>
      <div className="memberCardMBTI">
        <span>{props.mbti}</span>
      </div>
    </MemberCardContainer>
  )
}

const ResultMemberMbti = function(props: any){
  return (
    <GroupMemberWholeContainer drag dragConstraints={props.constraintsRef}>
    <div className="memberTitle">
      <span>RedVelvet<br/> 멤버들의 MBTI</span>
    </div>
    <ResultMemberMbtiContainer>
      {girlGroupMemberArr.map((item: any, index: number) => 
        <MemberCard key={index} name={item.name} url={item.url} mbti={item.mbti}/>
      )}
      <div className="sourceInformation">
        <div><strong>※</strong><br/>포털사이트에서<br/> 검색된 결과로<br/> 부정확한 정보가<br/> 있을 수 있습니다.</div>
      </div>
    </ResultMemberMbtiContainer>    
    </GroupMemberWholeContainer>
  )
}

export default ResultMemberMbti ;