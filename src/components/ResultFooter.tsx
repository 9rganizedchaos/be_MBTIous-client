import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faComment, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components'

const ResultFooterContainer = styled.div`
${( { theme} ) => {
  return css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-style: italic;
  font-size: 1.25rem;
  font-weight: 800;
  .result-footer-title{
    color: ${theme.color.main};
    margin-top: 1.5rem;
  }
  .result-footer-test-again {
    color: ${theme.color.sub};
    text-align: center;
    strong {
      font-style: normal;
    }
  }
  .result-footer-again-btn {
    color: ${theme.color.sub};
    border: 2px solid ${theme.color.sub};
    text-align: center;
    margin: 1rem 4rem 0rem;
    padding: 0.5rem 0.75rem;
  }
  `
}}
`;

const ButtonBox = styled.div`
${( { theme } ) => {
  return css`
display: flex;
button{
  cursor: pointer;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  color: ${theme.color.sub};
  background-color: ${theme.color.main};
  margin: 1rem 0.25rem 2rem;
  svg {
    font-size: 1.4rem;
  }
}
`
}}
`;

const TestAgainBox = styled.div`
${( { theme } ) => {
  return css`
background-color: ${theme.color.main};
color: ${theme.color.sub};
width: 100%;
padding: 2rem;
.result-footer-again-btn {
  text-decoration : none;
  text-decoration-line : none;
}
`
}}
`;

const GoodbyeBox = styled.div`
${( { theme } ) => {
  return css`
  padding: 1rem 0;
  width: 100%;
  background-color: ${theme.color.main};
  color: ${theme.color.sub};
  font-size: 1rem;
  text-align: right;
  padding-bottom: 10rem;
  a {
    text-decoration: none;
    color: ${theme.color.sub};
  }
  .thankyou {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
  .atag{
    font-size: 0.75rem;
  }
  .copyright {
    margin-top: 1.75rem;
  }
`
}}
`;


const ResultFooter = function(props: any){
  return(
    <ResultFooterContainer>
      <TestAgainBox>
      <div className="result-footer-test-again">If you wanna get this test again,<br/> <strong>▼ Click! ▼</strong></div>
      <Link to="/">
        <div className="result-footer-again-btn">TEST AGAIN</div>
      </Link>
      </TestAgainBox>
      <div className="result-footer-title">Share your test result!</div>
      <ButtonBox>
          <button onClick={props.handleKakaoBtn}>
            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
          </button>
          <button onClick={props.handleTwitterBtn}>
            <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
          </button>
          <button onClick={props.handleFacebookBtn}>
            <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
          </button>
          <button onClick={props.handleCopyBtn}>
            <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
          </button>
      </ButtonBox>
      <GoodbyeBox>
        <div className="thankyou">Thank you for Enjoying</div>
        <div className="atag">Git Repo: <a href="https://github.com/9rganizedchaos/be_MBTIous-client" target='_blank' rel="noreferrer">https://github.com/9rganizedchaos/be_MBTIous-client</a></div>
        <div className="atag">My Blog: <a href="https://velog.io/@9rganizedchaos" target='_blank' rel="noreferrer">https://velog.io/@9rganizedchaos</a></div>
        <div className="copyright">ⓒ 2021. 9rganizedchaos all rights reserved</div>
      </GoodbyeBox>
    </ResultFooterContainer>
  )
}

export default ResultFooter;