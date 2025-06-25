import * as THREE from 'three';

//script imports
import {initSetup,postProcessSetup,lightingSetup} from '/scripts/solarSystem/initCanvasSetup.js';
import {initSun,initPlanetObjects} from '/scripts/solarSystem/initPlanetObjects.js';
import {sequentialHideUnselected, sequentialReveal, solarStartSunrise,hideAllExceptSelected,fadeSunOpacity} from '/scripts/solarSystem/sequenceAnim.js';
import { plane } from 'three/examples/jsm/Addons.js';

export async function initSolarSystem(preloadedModels) {
  // ******  SETUP  ******
  const { scene, camera, renderer, controls, canvas } = initSetup();
  const { composer,outlinePass,fxaaPass } = postProcessSetup(renderer, scene, camera);
  lightingSetup(scene);
  
  // ****** SETTINGS FOR INTERACTIVE CONTROLS  ******
  const settings = {
    accelerationOrbit: 1,
    acceleration: 1,
    sunIntensity: 0
  };

  // mouse movement
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hasMouseMove = false;

  function onMouseMove(event) {
      if (!hoverEnabled) return;

      hasMouseMove = true;
      event.preventDefault();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(raycastTargets);

    const card = document.getElementById('hoverCard');

    if (intersects.length > 0) {
      const object = intersects[0].object;

      // Position the card near the cursor
      card.style.left = `${event.clientX + 10}px`;
      card.style.top = `${event.clientY + 10}px`;
      card.style.display = 'block';

      // Add name or info
      if (object === sun) {
        card.innerText = "Contact me";
      } else if (mercury.meshes.includes(object)) {
        card.innerText = "Resume";
      } else if (venus.meshes.includes(object)) {
        card.innerText = "Skill sets";
      } else if (object === earth.planet || object === earth.Atmosphere) {
        card.innerText = "Robotics";
      } else if (mars.meshes.includes(object)) {
        card.innerText = "Extracurricular";
      } else if (jupiter.meshes.includes(object)) {
        card.innerText = "Childhood";
      } else if (saturn.meshes.includes(object)) {
        card.innerText = "About me";
      } else {
        card.innerText = "";
        card.style.display = 'none';
      }

    } else {
      card.style.display = 'none';
    }

  }

  // ******  Globals  ******

  let isMovingTowardsPlanet = false;
  let targetCameraPosition = new THREE.Vector3();
  let hoverEnabled = true;
  let offset;
 

  function onDocumentMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(raycastTargets);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const selectedPlanetIndex = identifyPlanet(clickedObject,sun, planets);
      let selectedPlanet = null;
      if (selectedPlanetIndex === 0) {
        selectedPlanet = sun;
      } else if (selectedPlanetIndex > 0) {
        selectedPlanet = planets[selectedPlanetIndex - 1];
      }

      if (selectedPlanet) {
        window.planetIndex = selectedPlanetIndex;
        offset = offsets[selectedPlanetIndex];
        const indexAnnouncementEvent = new CustomEvent("solarSystemToInfoSection",
          {
            detail: {index: window.planetIndex}
          }
        )
        window.dispatchEvent(indexAnnouncementEvent);
        settings.accelerationOrbit = 0;

        const planetPosition = new THREE.Vector3();

        if (!(selectedPlanet === sun)) {
          fadeSunOpacity(sunMat, 0, 1000);
          selectedPlanet.planet.getWorldPosition(planetPosition);
        }

        window.dispatchEvent(new CustomEvent("circularBorder"));
        
        isMovingTowardsPlanet = true;
        controls.target.copy(planetPosition);
        camera.lookAt(planetPosition);
        targetCameraPosition.copy(planetPosition).add(
          camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset)
        );
        // Wait for sequential hide to complete before moving camera
        sequentialHideUnselected(selectedPlanet, planets);
        setTimeout(()=>{
          window.dispatchEvent(new CustomEvent("beginPlanetTransform"));
        },1000)

        hoverEnabled = false;
        hasMouseMove = false;
        document.getElementById('hoverCard').style.display = 'none';
        outlinePass.selectedObjects = [];
        
      }
    }
  }



  // ******  SHOW PLANET INFO AFTER SELECTION  ******

  let isZoomingOut = false;
  let zoomOutTargetPosition = new THREE.Vector3(-175, 115, 5);

  // ******  SUN  ******
  const { sun, sunMat } = initSun();

  scene.add(sun);
  window.dispatchEvent(new CustomEvent("sunLoaded"));
 


  const{mercury, venus, earth, mars, jupiter, saturn,planets} = await initPlanetObjects();


  planets.forEach((planet) => {
    planet.planet3d.visible = false; // Initially hide them all
    scene.add(planet.planet3d); // Add to the scene
  });


  window.dispatchEvent(new CustomEvent("planetsLoaded"));

  const offsets = [
    70,    // sun
    30,  // mercury
    30,  // venus
    25,    // earth
    30,    // mars
    65,    // jupiter
    70     // saturn
  ];

  // Array of planets and atmospheres for raycasting
  const raycastTargets = [
    sun, mercury.planet, venus.planet, earth.planet, 
    mars.planet, jupiter.planet, saturn.planet
  ];

  // ******  SHADOWS  ******
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows


  function solarTransformDownZoomOut() {
    const startY = sun.position.y;
    const targetY = 0;

    const startScale = sun.scale.x; // assumed uniform scale
    const targetScale = 1;

    const duration = 2500; // ms
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = t * t * (3 - 2 * t); // smoothstep easing

      // Position
      sun.position.y = startY + (targetY - startY) * easedT;

      // Scale
      const scale = startScale + (targetScale - startScale) * easedT;
      sun.scale.set(scale, scale, scale);

      if (t < 1) {
        requestAnimationFrame(animate);
      }else{
        window.dispatchEvent(new CustomEvent("sunZoomComplete"));
      }
    }

    requestAnimationFrame(animate);
  }

  function animate() {

    //rotating planets around the sun and itself
    sun.rotateY(0.0015);


    for (const p of planets) {
      p.rotateSelf(p.planet, p.rotationSpeed, settings.acceleration);
      p.planet3d.rotateY(p.orbitSpeed * settings.accelerationOrbit);
    }

  if (hasMouseMove){
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    var intersects = raycaster.intersectObjects(raycastTargets);

    // Reset all outlines
    outlinePass.selectedObjects = [];

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;

      // If the intersected object is an atmosphere, find the corresponding planet
      if (intersectedObject === earth) {
        outlinePass.selectedObjects = [earth.planet];
      } else if (intersectedObject === venus.Atmosphere) {
        outlinePass.selectedObjects = [venus.planet];
      } else {
        // For other planets, outline the intersected object itself
        outlinePass.selectedObjects = [intersectedObject];
      }
    }
  }

  // ******  ZOOM IN/OUT  ******
  if (isMovingTowardsPlanet) {
    camera.position.lerp(targetCameraPosition, 0.03);
    if (camera.position.distanceTo(targetCameraPosition) < 1) {
      isMovingTowardsPlanet = false;
    }
  } else if (isZoomingOut) {
    camera.position.lerp(zoomOutTargetPosition, 0.03);

    if (camera.position.distanceTo(zoomOutTargetPosition) < 1) {
        isZoomingOut = false;
    }
  }

    controls.update();
    requestAnimationFrame(animate);
    composer.render();
  }
  animate();

  

  
  function planetChange(event){
    const index = event.detail.index;
    let selected;
    // Determine the selected planet based on the index
    if (index == 0) {
      selected = sun;
    }else{
      selected = planets[index - 1];
    }
    const offset = offsets[index];

    sequentialHideUnselected(selected, planets,0);

    selected.planet.visible = true;
    selected.planet.traverse(child => {
    child.visible = true; // <- make child renderable
    if (child.material) {
      child.material.transparent = true;
      child.material.opacity = 1;
    }
  });
    const planetPosition = new THREE.Vector3();
    selected.planet.getWorldPosition(planetPosition);

    // Update camera target and position

    controls.target.copy(planetPosition);
    camera.lookAt(planetPosition);
    targetCameraPosition.copy(planetPosition).add(
      camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset)
    );
    
    camera.position.copy(targetCameraPosition);
    
    console.log(`Camera updated to: ${selected.name}`);
  }

  function handleResize(renderer,camera,fxaaPass) {
    const canvas = document.getElementById("threeCanvas");
    const pixelRatio = renderer.getPixelRatio();

    // Get current transform (e.g. scale + translate from animation)
    const currentTransform = window.getComputedStyle(canvas).transform;

    // Temporarily clear transform so we can measure properly
    canvas.style.transform = "none";

    // Resize Three.js renderer and camera
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Reset and reapply original transform
    canvas.style.transform = currentTransform;

    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (window.innerWidth * pixelRatio),
      1 / (window.innerHeight * pixelRatio)
    );

    // Optionally, re-calculate new position based on rectBefore if you want more precise adjustment
  }

  async function handleZoomOut() {
    isZoomingOut = true;
    console.log("zoom out received!");

    fadeSunOpacity(sunMat, 1, 2000);
    settings.accelerationOrbit = 1;

    setTimeout(() => {
      sequentialReveal(planets, hoverEnabled, 500);
    }, 500);
  }

  window.addEventListener("planetChange", (event) => {
    planetChange(event);
  });

  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('click', onDocumentMouseClick, false);

  window.addEventListener('zoomOutNeeded', handleZoomOut);

  window.addEventListener('beginSunrise', () => {
    solarStartSunrise(sun);
  });

  window.addEventListener('solarTransformDownZoomOutCue', () => {solarTransformDownZoomOut();});
  window.addEventListener('firstReveal', () => {sequentialReveal(planets, hoverEnabled, 1000);});
  window.addEventListener('resize', handleResize(renderer,camera,fxaaPass));
}

// Helper functions

 function isDescendantOf(object, potentialAncestor) {
    let current = object;
    while (current) {
      if (current === potentialAncestor) return true;
      current = current.parent;
    }
    return false;
  }

  

  function identifyPlanet(clickedObject, sunMat, planets) {
    if (clickedObject.material === sunMat) {
      return 0;
    }

    for (let i = 0; i < planets.length; i++) {
      if (planets[i].planet && isDescendantOf(clickedObject, planets[i].planet)) {
        return i+1;
      }
    }
    return null;
  }





  


 