import { Fragment } from 'react';
import {withRouter} from "react-router";
import Test from "../components/Test";
import styled from "styled-components";
import questionArr from "../assets/questions"

const TestpageContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-itmes: center;
`;

function TestPage() {
  return (
    <TestpageContainer>
      {questionArr.map((item, index) => <Test question={item} index={index + 1}/>)}
    </TestpageContainer>
  )
}

export default withRouter(TestPage);