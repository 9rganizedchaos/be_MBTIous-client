import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const CuratorContainer = styled(motion.div)`
${( { theme } ) => {
  return css`
position: absolute;
width: 100vw;
height: 10rem;
background-color: ${theme.color.main};
bottom: 0;
display: flex;
padding: 0.25rem;
font-weight: 800;
font-size: 3rem;
align-items: center;
justify-content: space-between;
color: ${theme.color.sub};
.curator__sentence-box{
  display: flex;
  .curator__sentence1 {
    font-style: italic;
    height: 3rem;
    margin-left: 2rem;
  }
  .curator__sentence2 {
    border-bottom: 2px solid ${theme.color.sub};;
    width: 27rem;
    height: 4rem;
    font-style: italic;
    color: white;
    text-align: center;
    padding: 0.25rem;
    margin: 0 1.5rem;
  }
  .curator__sentence3 {
    height: 3rem;
    font-style: italic;
  }
}
.curator__icon-box{
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: ${theme.color.sub};;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  .fa-play {
    color: ${theme.color.main};
    transform: translateX(4px);
  }
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  .curator__sentence-box{
    flex-direction: column;
    width: calc(100% - 7rem);
    .curator__sentence1 {
      margin-left: 0.75rem;
      font-size: 2.1rem;
      display: flex;
      align-items: center;
    }
  }
  .curator__icon-box{
    width: 5rem;
    height: 5rem;
    margin-right: 0.75rem;
  }
}
`
}}
`

const artistCuratorVariants: any = {
  hidden: {
    y: "100vh",
  },
  visible: {
    y: 0,
    transition: { delay: 0.01, duration: 1 },
  },
} 

function ArtistCurator(props: any) {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { color, view } = viewState;

  return (
    <CuratorContainer variants={artistCuratorVariants} initial="hidden" animate="visible">
      <div className="curator__sentence-box">
      <div className="curator__sentence1">{`Your Favorite Kpop Girl Group is ${props.favoriteArtist}`}</div>
      {view === "mobile" ? null : <div className="curator__sentence2">{props.favoriteArtist}</div>}
      {view === "mobile" ? null : <div className="curator__sentence3">!</div>}
      </div>
      <div className="curator__icon-box" onClick={props.handleNextClick}>
      <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
      </div>
    </CuratorContainer>
  )
}

export default ArtistCurator;