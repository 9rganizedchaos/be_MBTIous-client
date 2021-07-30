import { useEffect, Fragment, useRef } from 'react';
import {withRouter} from "react-router";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


function ArtistsPage() {
  const artistsPageContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene()

    // Object 
    const r = 4;
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: '#887700'
    })

    const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube5 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube6 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube7 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube8 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube9 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube10 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube11 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube12 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube13 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube14 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube15 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    const cube16 = new THREE.Mesh(cubeGeometry, cubeMaterial);

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
    const rayOrigin = new THREE.Vector3(- 3, 0, 0)
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
    
    window.addEventListener('click', () =>
    {
        if(currentIntersect)
        {
            switch(currentIntersect.object)
            {
                case cube1:
                    console.log('click on cube 1')
                    break
    
                case cube2:
                    console.log('click on cube 2')
                    break
    
                case cube3:
                    console.log('click on cube 3')
                    break

                case cube4:
                    console.log('click on cube 4')
                    break

                case cube5:
                    console.log('click on cube 5')
                    break
                    
                case cube6:
                    console.log('click on cube 6')
                    break                    

                case cube7:
                    console.log('click on cube 7')
                    break

                case cube8:
                    console.log('click on cube 8')
                    break

                case cube9:
                    console.log('click on cube 9')
                    break

                case cube10:
                    console.log('click on cube 10')
                    break

                case cube11:
                    console.log('click on cube 11')
                    break

                case cube12:
                    console.log('click on cube 12')
                    break

                case cube13:
                    console.log('click on cube 13')
                    break

                case cube14:
                    console.log('click on cube 14')
                    break

                case cube15:
                    console.log('click on cube 15')
                    break

                case cube16:
                    console.log('click on cube 16')
                    break
            }
        }
    })
        

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
    camera.position.z = 2;
    camera.position.y = 1;
    scene.add(camera)
    
    // Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

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
      if(artistsPageContainer.current){
        artistsPageContainer.current.removeChild(renderer.domElement)
      }
    }    
  }, [])
  return (
    <Fragment>
    <div ref={artistsPageContainer}></div>
    </Fragment>
  )
}

export default withRouter(ArtistsPage);