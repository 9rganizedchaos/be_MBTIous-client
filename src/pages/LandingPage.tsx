import { useEffect, useRef } from "react";
import { withRouter } from "react-router";
import * as THREE from "three"; 

function LandingPage() {
  const landingPageCanvas = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Sizes
    const sizes = {
        width: 800,
        height: 600
    }
    
    // Scene
    const scene = new THREE.Scene()
    
    // Object
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: '#ff0000'
    })
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
    scene.add(cubeMesh)
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.position.z = 3
    scene.add(camera)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    if(landingPageCanvas.current){
      landingPageCanvas.current.appendChild(renderer.domElement)
    }

    renderer.render(scene, camera)

    return () => {
      if(landingPageCanvas.current){
        landingPageCanvas.current.removeChild(renderer.domElement)
      }
    }
  }, [])
  
  return (
    <div ref={landingPageCanvas}></div>
  )
}

export default withRouter(LandingPage);