import styled from 'styled-components'
import { motion } from "framer-motion";
import { useEffect } from 'react';
import { useRef } from 'react';

const ResultAlbumCoverContainer = styled(motion.div) `
width: 150px;
height: 150px;
position: absolute;
top: calc(50% - 150px / 2);
left: calc(50% - 150px / 2);
border: 3px solid #705DF2;
background-position: center;
background-size: cover;
`;

const ResultAlbumCover = function(props: any){
  const albumCover = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(albumCover.current){
      albumCover.current.style.backgroundImage = `url(${props.albumCoverUrl})`;
    }
  }, [])
  
  return (
    <ResultAlbumCoverContainer drag dragConstraints={props.constraintsRef} ref={albumCover}>
    </ResultAlbumCoverContainer>    
  )
}

export default ResultAlbumCover ;