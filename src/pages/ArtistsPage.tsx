import { useEffect, Fragment, useRef, useState } from 'react';
import {withRouter} from "react-router";
import * as THREE from "three";
import styled, { css } from "styled-components";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { AnimatePresence, motion } from "framer-motion";
import TutorialCircle from '../components/TutorialCircle';
import ArtistCurator from '../components/ArtistCurator';
import { useDispatch, useSelector } from 'react-redux';
import { updateArtist } from "../action/actions";
import { Link } from 'react-router-dom';
import { RootState } from '../reducers';
import ArtistAlert from '../components/ArtistAlert';
import groupsArr from '../assets/groups';

interface Edge {
  left: number;
  right: number;
}

interface ArtistEdge {
  top: number;
  bottom: number;
}

const Logo = styled.div`
${( { theme } ) => {
  return css`
position: absolute;
color: ${theme.color.main};
font-weight: 800;
font-style: italic;
font-size: 2rem;
margin: 1rem;
`
}}
`;

const ArtistSideEdge = styled.div<Edge>`
position: absolute;
left: ${(props) => props.left ? 100 : 0};
right: ${(props) => props.right ? 100 : 0};
top: 0;
width: 0.25rem;
height: 100vh;
${( { theme } ) => {
  return css`
background-color: ${theme.color.main};
`}}
z-index: 11;
`;

const ArtistEdge = styled.div<ArtistEdge>`
position: absolute;
top: ${(props) => props.top ? 100 : 0};
bottom: ${(props) => props.bottom ? 100 : 0};
left: 0;
width: 100vw;
height: 0.25rem;
${( { theme } ) => {
  return css`
background-color: ${theme.color.main};
`}}
z-index: 11;
`;

const TutorialBox = styled(motion.div)`
${( { theme } ) => {
  return css`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
color: ${theme.color.main};
z-index: 10;
.title {
  margin: auto;
  font-weight: 800;
  font-style: italic;
  font-size: 5rem;
  strong {
    -webkit-text-fill-color: ${theme.color.sub};
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${theme.color.main};
  }
}
.description {
  margin-top: 0.25rem;
  width: 90%;
  line-height: 160%;
}
@media (${theme.size.tablet}) {
}
@media (${theme.size.mobile}) {
  .title{
    font-size: 2.75rem;
  }
}
`
}}
`;

const tutorialBoxVariants: any = {
  exit: {
    opacity: 0
  },
}

function ArtistsPage({ history }: any) {
  const viewState = useSelector((state: RootState) => state.viewReducer);
  const { color, view } = viewState;

  const dispatch = useDispatch();

  const [favoriteArtist, setArtist] = useState("");
  const [isTutorialOn, setTutorial] = useState(true);
  const [isTurotrialCircleOn, setCircle] = useState(true);
  const [isArtistAlertOpen, setArtistAlert] = useState(false);
  const [alertPageX, setPageX] = useState(0);
  const [alertPageY, setPageY] = useState(0);

  const artistsPageContainer = useRef<HTMLDivElement | null>(null);

  const handleNextClick = (e: any) => {
    if(favoriteArtist === ""){
      setArtistAlert(true);
      setTimeout(() => {
        setArtistAlert(false);
      }, 2000);
      setPageX(e.pageX);
      setPageY(e.pageY);
    } else {
      history.push("/test");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setTutorial(false);
    }, 3500)

    setTimeout(() => {
      setCircle(false);
    }, 9200)

    //loader
    const loader = new THREE.TextureLoader();
    const cubeMaterial1 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[0].code}6.jpg`),
    }); 
    const cubeMaterial2 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[1].code}5.jpg`),
    }); 
    const cubeMaterial3 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[2].code}2.jpg`),
    }); 
    const cubeMaterial4 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[3].code}4.jpg`),
    }); 
    const cubeMaterial5 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[4].code}3.jpg`),
    }); 
    const cubeMaterial6 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[5].code}1.jpg`),
    }); 
    const cubeMaterial7 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[6].code}4.jpg`),
    }); 
    const cubeMaterial8 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[7].code}2.jpg`),
    });
    const cubeMaterial9 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[8].code}7.jpg`),
    }); 
    const cubeMaterial10 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[9].code}1.jpg`),
    }); 
    const cubeMaterial11 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[10].code}5.jpg`),
    }); 
    const cubeMaterial12 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[11].code}8.jpg`),
    }); 
    const cubeMaterial13 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[12].code}1.jpg`),
    }); 
    const cubeMaterial14 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[13].code}5.jpg`),
    }); 
    const cubeMaterial15 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[14].code}5.jpg`),
    }); 
    const cubeMaterial16 = new THREE.MeshBasicMaterial({
      map: loader.load(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${groupsArr[15].code}1.jpg`),
    }); 

    // Scene
    const scene = new THREE.Scene()

    // Object 
    const r = 4;
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

    const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial1);
    const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
    const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial3);
    const cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial4);
    const cube5 = new THREE.Mesh(cubeGeometry, cubeMaterial5);
    const cube6 = new THREE.Mesh(cubeGeometry, cubeMaterial6);
    const cube7 = new THREE.Mesh(cubeGeometry, cubeMaterial7);
    const cube8 = new THREE.Mesh(cubeGeometry, cubeMaterial8);
    const cube9 = new THREE.Mesh(cubeGeometry, cubeMaterial9);
    const cube10 = new THREE.Mesh(cubeGeometry, cubeMaterial10);
    const cube11 = new THREE.Mesh(cubeGeometry, cubeMaterial11);
    const cube12 = new THREE.Mesh(cubeGeometry, cubeMaterial12);
    const cube13 = new THREE.Mesh(cubeGeometry, cubeMaterial13);
    const cube14 = new THREE.Mesh(cubeGeometry, cubeMaterial14);
    const cube15 = new THREE.Mesh(cubeGeometry, cubeMaterial15);
    const cube16 = new THREE.Mesh(cubeGeometry, cubeMaterial16);

    const cubeArr = [cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11, cube12, cube13, cube14, cube15, cube16];

    cubeArr.forEach((cube, i) => {
      cube.rotation.y = Math.PI * 2 / 16 * (i + 1);
      cube.position.x = Math.sin(2 * Math.PI / 16 * (i + 1)) * r;
      cube.position.z = Math.cos(2 * Math.PI / 16 * (i + 1)) * r;
      scene.add(cube)
    })

    /**
     * Raycaster
     */
    const raycaster = new THREE.Raycaster()
    let currentIntersect: any = null
    // const rayOrigin = new THREE.Vector3(- 3, 0, 0)
    const rayDirection = new THREE.Vector3(10, 0, 0)
    rayDirection.normalize()

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    
    /**
     * Mouse
     */
    const mouse = new THREE.Vector2()
    
    window.addEventListener('mousemove', (event) =>
    {
        mouse.x = event.clientX / sizes.width * 2 - 1
        mouse.y = - (event.clientY / sizes.height) * 2 + 1
    })
    
    const handleBoxClick = () =>
    {
        if(currentIntersect)
        {
            switch(currentIntersect.object)
            {
                case cube1:
                    setArtist(groupsArr[0].name);
                    dispatch(updateArtist(groupsArr[0].name));
                    break
    
                case cube2:
                    setArtist(groupsArr[1].name);
                    dispatch(updateArtist(groupsArr[1].name));
                    break
    
                case cube3:
                    setArtist(groupsArr[2].name)
                    dispatch(updateArtist(groupsArr[2].name));
                    break

                case cube4:
                    setArtist(groupsArr[3].name)
                    dispatch(updateArtist(groupsArr[3].name));
                    break

                case cube5:
                    setArtist(groupsArr[4].name);
                    dispatch(updateArtist(groupsArr[4].name));
                    break
                    
                case cube6:
                  setArtist(groupsArr[5].name)
                  dispatch(updateArtist(groupsArr[5].name));
                    break                    

                case cube7:
                  setArtist(groupsArr[6].name)
                  dispatch(updateArtist(groupsArr[6].name));
                    break

                case cube8:
                  setArtist(groupsArr[7].name)
                  dispatch(updateArtist(groupsArr[7].name));
                    break

                case cube9:
                  setArtist(groupsArr[8].name)
                  dispatch(updateArtist(groupsArr[8].name));
                    break

                case cube10:
                  setArtist(groupsArr[9].name)
                  dispatch(updateArtist(groupsArr[9].name));
                    break

                case cube11:
                  setArtist(groupsArr[10].name)
                  dispatch(updateArtist(groupsArr[10].name));
                    break

                case cube12:
                  setArtist(groupsArr[11].name)
                  dispatch(updateArtist(groupsArr[11].name));
                    break

                case cube13:
                  setArtist(groupsArr[12].name)
                  dispatch(updateArtist(groupsArr[12].name));
                    break

                case cube14:
                  setArtist(groupsArr[13].name);
                  dispatch(updateArtist(groupsArr[13].name));
                    break

                case cube15:
                  setArtist(groupsArr[14].name)
                  dispatch(updateArtist(groupsArr[14].name));
                    break

                case cube16:
                  setArtist(groupsArr[15].name)
                  dispatch(updateArtist(groupsArr[15].name));
                    break
            }
        }
    }

    window.addEventListener('click', handleBoxClick);     

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.position.y = 3;
    scene.add(camera)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x1B1B1B);

    if(artistsPageContainer.current){
      artistsPageContainer.current.appendChild(renderer.domElement)
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    /** 
     * Animate
     */

    const clock = new THREE.Clock();
    // 애니메이션 적용
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(cubeArr)

      if(intersects.length){
        currentIntersect = intersects[0]
      } else {
        currentIntersect = null;
      }

      controls.update();
      renderer.render(scene, camera);
      if(elapsedTime > 1 && elapsedTime < 2.95){
        if(view === "mobile"){
          camera.position.y += 0.03;
        } else {
          camera.position.y += 0.01;
        }
      } else if (elapsedTime > 4 && elapsedTime < 8.75){
        if(view === "mobile"){
          camera.position.y -= 0.008;
          camera.position.z += 0.03;
        } else {
          camera.position.y -= 0.01;
          camera.position.z += 0.009;
        }
      } else if (elapsedTime > 9.9 && elapsedTime < 11.9){
        if(view === "mobile"){
          camera.position.z -= 0.045;
          camera.position.y -= 0.015;
        } 
      }
      requestAnimationFrame(animate);
      // camera.rotation.x += 0.004;
      // camera.rotation.y += 0.004;
    }

    // 윈도우 창 리사이즈 핸들 함수
    const handleResize = function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", handleResize, false);

    animate();

    // 클린업 함수
    return () => {
      window.removeEventListener("click", handleBoxClick);
      if(artistsPageContainer.current){
        artistsPageContainer.current.removeChild(renderer.domElement)
      }
    }    
  }, [])

  return (
    <Fragment>
      {isArtistAlertOpen ? <ArtistAlert alertPageX={alertPageX} alertPageY={alertPageY}/> : null}
      <Link to="/">
        <Logo>Be_MBTIous</Logo>
      </Link>
    <div ref={artistsPageContainer}></div>
    <AnimatePresence>
    {isTutorialOn ? <TutorialBox variants={tutorialBoxVariants} exit="exit">
      <motion.div className="title"><strong>FIRST, CHOOSE</strong><br/> YOUR FAVORITE<br/> KPOP ARTIST!!</motion.div>
    </TutorialBox> : isTurotrialCircleOn ? <TutorialCircle/> : <ArtistCurator handleNextClick={handleNextClick} favoriteArtist={favoriteArtist}/>}</AnimatePresence>
    <ArtistSideEdge left={100} right={0}/>
    <ArtistSideEdge left={0} right={100}/>
    <ArtistEdge top={100} bottom={0}/>
    <ArtistEdge top={0} bottom={100}/>
    </Fragment>
  )
}

export default withRouter(ArtistsPage);