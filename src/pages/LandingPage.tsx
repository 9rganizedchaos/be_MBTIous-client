import { useEffect, useRef, Fragment } from "react";
import { withRouter } from "react-router";
import * as THREE from "three"; 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import styled from "styled-components";
import Nav from "../components/Nav"
import Footer from "../components/Footer"

interface Edge {
  left: number;
  right: number;
}

const Title = styled.h1`
position: absolute;
left: 50%;
top: 45%;
transform: translate(-50%, -50%);
background-color: rgba(225, 225, 225, 1);
z-index: 10;
`;

const SideEdge = styled.div<Edge>`
position: absolute;
left: ${(props) => props.left ? 100 : 0};
right: ${(props) => props.right ? 100 : 0};
top: 0;
width: 0.5rem;
height: 100vh;
background-color: rgba(225, 225, 225, 1);
z-index: 10;
`;

const StartButton = styled.button`
position: absolute;
z-index: 10;
background-color: white;
top: 50%;
left: 50%;
transform: translateX(-50%);
cursor: pointer;
`;

function LandingPage(props: any) {
  const landingPageContainer = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    props.history.push("/artists");
  }

  useEffect(() => {
    //loader
    const loader = new THREE.CubeTextureLoader();
    loader.setPath("../static/");
    const textureCube = loader.load([
      '4.png', '4.png', '4.png', '4.png', '4.png', '4.png'
    ]);

    // Scene
    const scene = new THREE.Scene()

    // Object 
    for(let i = 0; i < 200; i++){
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
      const cubeMaterial = new THREE.MeshBasicMaterial({
          color: '#887700'
      })
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
      cube.position.x = (Math.random() - 0.5) * 20
      cube.position.y = (Math.random() - 0.5) * 20
      cube.position.z = (Math.random() - 0.5) * 20
      scene.add(cube)
    }
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.position.z = 3
    scene.add(camera)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

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

      controls.update();
      renderer.render(scene, camera);
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
      if(landingPageContainer.current){
        landingPageContainer.current.removeChild(renderer.domElement)
      }
    }
  })

  return (
    <Fragment>
      <div ref={landingPageContainer}></div>
      <Nav/>
      <Title>Be MBTIous</Title>
      <StartButton onClick={handleClick}>S T A R T</StartButton>
      <SideEdge left={100} right={0}/>
      <SideEdge left={0} right={100}/>
      <Footer/>
    </Fragment>
  )
}

export default withRouter(LandingPage);