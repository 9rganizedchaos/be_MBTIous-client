import styled from 'styled-components'
import { motion } from "framer-motion";

const ResultAlbumCoverContainer = styled(motion.div) `
background: #705DF2;
border-radius: 30px;
width: 150px;
height: 150px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
`;

const ResultAlbumCover = function(props: any){
  return (
    <ResultAlbumCoverContainer drag dragConstraints={props.constraintsRef}></ResultAlbumCoverContainer>    
  )
}

export default ResultAlbumCover ;