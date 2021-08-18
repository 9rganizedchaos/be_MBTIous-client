import styled, { css } from 'styled-components'

const ResultHeaderContainer = styled.div`
${( { theme} ) => {
  return css`
  position: relative;
  width: 100%;
  border-bottom: 3px solid ${theme.color.main};
  background-color: ${theme.color.sub};
  font-weight: 800;
  font-style: italic;
  font-size: 3rem;
  padding: 1rem;
  padding-bottom: 0rem;
  color: ${theme.color.main};
  div{
    display: flex;
    flex-direction: column;
  }
  .result-header-title{
    margin-bottom: 0.5rem;
  }
  .result-header-triangle {
    font-style: normal;
  }
  .result-header-scroll {
    position: relative;
    text-align: right;
    top: -1.5rem;
    font-weight: 400;
    font-size: 1.125rem;
  }
  `
}}
`;

const ResultHeader = function(props: any){
  return(
    <ResultHeaderContainer>
      <div>
        <div className="result-header-title">Your Test Result!</div>
        <div className="result-header-triangle">▼</div>
        <div className="result-header-triangle">▼</div>
      </div>
      <div className="result-header-scroll">Scroll Down, plz :)</div>
    </ResultHeaderContainer>
  )
}

export default ResultHeader;