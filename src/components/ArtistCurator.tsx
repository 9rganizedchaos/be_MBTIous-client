import styled from "styled-components";
import { motion } from "framer-motion";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CuratorContainer = styled(motion.div)`
position: absolute;
width: 100vw;
height: 10rem;
background-color: #705DF2;
bottom: 0;
display: flex;
padding: 0.25rem;
font-family: 'Roboto', sans-serif;
font-weight: 800;
font-size: 3rem;
align-items: center;
justify-content: space-between;
color: #1b1b1b;
.curator__sentence-box{
  display: flex;
  .curator__sentence1 {
    font-style: italic;
    height: 3rem;
    margin-left: 2rem;
  }
  .curator__sentence2 {
    border-bottom: 2px solid #1b1b1b;
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
  background-color: #1b1b1b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  .fa-play {
    color: #705DF2;
    transform: translateX(4px);
  }
}
`

const artistCuratorVariants: any = {
  hidden: {
    y: "100vh",
  },
  visible: {
    y: 0,
    transition: { delay: 0.25, duration: 1 },
  },
} 

function ArtistCurator(props: any) {

  return (
    <CuratorContainer variants={artistCuratorVariants} initial="hidden" animate="visible">
      <div className="curator__sentence-box">
      <div className="curator__sentence1">Your Favorite Kpop Girl Group is</div>
      <div className="curator__sentence2">{props.favoriteArtist}</div>
      <div className="curator__sentence3">!</div>
      </div>
      <div className="curator__icon-box" onClick={props.handleNextClick}>
      <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
      </div>
    </CuratorContainer>
  )
}

export default ArtistCurator;