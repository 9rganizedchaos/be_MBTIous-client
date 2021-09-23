import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { useRef } from 'react';

interface ComponentTagProps {
  top: number;
  left: number;
}

const ResultAlbumCoverContainer = styled(motion.div)<ComponentTagProps>`
  ${( { theme, top, left } ) => {
    return css`
  width: 150px;
  height: 150px;
  position: absolute;
  top: ${top}px;
  left: ${left}px;
  border: 3px solid ${theme.color.main};
  background-position: center;
  background-size: cover;
  `
  }}
`;

const ResultAlbumCover = function(props: any){
  const albumCover = useRef<HTMLDivElement>(null);
  const [top] = useState(Math.floor(Math.random() * (window.innerHeight - 150)));
  const [left] = useState(Math.floor(Math.random() * (window.innerWidth - 320 - 150)) + 320);

  useEffect(() => {
    if(albumCover.current){
      albumCover.current.style.backgroundImage = `url(${props.albumCoverUrl})`;
    }
  }, [])
  
  return (
    <ResultAlbumCoverContainer drag dragConstraints={props.constraintsRef} ref={albumCover} top={top} left={left}>
    </ResultAlbumCoverContainer>    
  )
}

export default ResultAlbumCover ;