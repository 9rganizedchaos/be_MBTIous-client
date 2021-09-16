import { useEffect, useRef, Fragment, useState } from "react";
import { withRouter } from "react-router";
import * as THREE from "three"; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import styled, { css } from "styled-components";
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { motion } from "framer-motion";
import groupsArr from '../assets/groups';
import LandingAlert from '../components/LandingAlert';

interface Edge {
  left: number;
  right: number;
}

const Title = styled.h1`
${( { theme } ) => {
  return css`
    width: 100%;
    text-align: center;
    font-weight: 800;
    font-style: italic;
    font-size: 8rem;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    z-index: 10;
    -webkit-text-fill-color: ${theme.color.sub};
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${theme.color.main};
    strong {
      -webkit-text-fill-color: ${theme.color.main};
      color: ${theme.color.main};
    }
    @media (${theme.size.tablet}) {
      font-size: 6rem;
    }
    @media (${theme.size.mobile}) {
      font-size: 3.5rem;
      top: 32%;
    }
  `
}}
`;

const SideEdge = styled.div<Edge>`
position: absolute;
left: ${(props) => props.left ? 100 : 0};
right: ${(props) => props.right ? 100 : 0};
top: 0;
width: 0.7rem;
height: 100vh;
${( { theme } ) => {
  return css`
  background-color: ${theme.color.main};
  `}}
z-index: 11;
`;

const StartButton = styled(motion.button)`
${( { theme } ) => {
  return css`
position: absolute;
z-index: 10;
top: 50%;
left: 50%;
transform: translateX(-50%);
cursor: pointer;
width: 40rem;
height: 3.25rem;
border: 2px solid ${theme.color.main};
background-color: ${theme.color.sub};
color: ${theme.color.main};
font-weight: 800;
font-size: 1.75rem;
transition: all .35s;
&:hover {
  background-color: ${theme.color.main};
  color: ${theme.color.sub};
}
&:before {
  opacity: .5;
}
&:hover:before {
  top: 0;
}
@media (${theme.size.tablet}) {
width: 80%;
}
@media (${theme.size.mobile}) {
top: 43%;
font-size: 1.5rem;
}
`}}
`;

function LandingPage(props: any) {
  const landingPageContainer = useRef<HTMLDivElement | null>(null);

  const [isAlertMessageOpen, setAlertOpen] = useState(false);
  const [alertPageX, setPageX] = useState(0);
  const [alertPageY, setPageY] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertIcon, setAlertIcon] = useState("");


  const handleStartClick = () => {
    props.history.push("/artists");
  }

  const handleColorChange = (e: any) => {
    setPageX(e.pageX);
    setPageY(e.pageY);
    setAlertMessage("색상이 변경되었습니다.");
    setAlertOpen(true);
    setAlertIcon("info");
    setTimeout(() => {
      setAlertOpen(false);
    }, 1000);
  }

  const handleCopyBtn = (e: any) => {
    setPageX(e.pageX);
    setPageY(e.pageY);
    setAlertMessage("링크가 복사되었습니다.");
    setAlertOpen(true);
    setAlertIcon("info");
    setTimeout(() => {
      setAlertOpen(false);
    }, 1000);
  }

  const handleLanguageChange = (e: any) => {
    setPageX(e.pageX);
    setPageY(e.pageY);
    setAlertMessage("준비중인 서비스입니다.");
    setAlertOpen(true);
    setAlertIcon("alert");
    setTimeout(() => {
      setAlertOpen(false);
    }, 1000);
  }

  useEffect(() => {
    //ImageUrl 배열 만들기
    // let imageUrlArr: any = [
    //   `https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/LN5.jpeg`,
    //   `https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/AE3.jpeg`
    // ];
    let imageUrlArr: any = [];
    groupsArr.forEach((item: any) => {
      let randomNum = Math.floor(Math.random() * item.albumCover + 1);
      imageUrlArr.push(`https://s3.ap-northeast-2.amazonaws.com/mbtious.net/resizeAlbumCover/${item.code}${randomNum}.jpeg`)
    })
    let pickedRandomNum1: number = Math.floor(Math.random() * imageUrlArr.length);
    let pickedRandomNum2: number = Math.floor(Math.random() * imageUrlArr.length);
    let pickedRandomArr = [pickedRandomNum1, pickedRandomNum2]; 

    //loader
    // Scene
    const scene = new THREE.Scene()

    // Object 
    for(let i = 0; i < 256; i++){
      let randomNum = Math.floor(Math.random() * 2);
      const loader = new THREE.TextureLoader();
      const material = new THREE.MeshBasicMaterial({
        map: loader.load(imageUrlArr[pickedRandomArr[randomNum]]),
      }); 
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
      const cube = new THREE.Mesh(cubeGeometry, material)
      cube.position.x = (Math.random() - 0.5) * 20
      cube.position.y = (Math.random() - 0.5) * 20
      cube.position.z = (Math.random() - 0.5) * 20
      scene.add(cube)
    }
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.position.z = 4
    scene.add(camera)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x1B1B1B);

    if(landingPageContainer.current){
      landingPageContainer.current.appendChild(renderer.domElement)
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    /** Animate */

    const clock = new THREE.Clock();
    // 애니메이션 적용
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      camera.rotation.y += 0.004;
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
      if(landingPageContainer.current){
        landingPageContainer.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <Fragment>
      {isAlertMessageOpen ? <LandingAlert alertPageX={alertPageX} alertPageY={alertPageY} alertMessage={alertMessage} alertIcon={alertIcon}/> : null}
      <div ref={landingPageContainer}></div>
      <Nav handleThemeChange={props.handleThemeChange} handleColorChange={handleColorChange} handleLanguageChange={handleLanguageChange}/>
      <Title>Be <strong>MBTI</strong>ous</Title>
      <StartButton onClick={handleStartClick}>CLICK TO START</StartButton>
      <SideEdge left={100} right={0}/>
      <SideEdge left={0} right={100}/>
      <Footer handleCopyBtn={handleCopyBtn}/>
    </Fragment>
  )
}

export default withRouter(LandingPage);