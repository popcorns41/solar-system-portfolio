import * as THREE from 'three';

//script imports
import {initSetup,postProcessSetup,lightingSetup} from '/scripts/solarSystem/initCanvasSetup.js';
import {initSun,initPlanetObjects} from '/scripts/solarSystem/initPlanetObjects.js';
import {sequentialHideUnselected, sequentialReveal, solarStartSunrise,solarTransformDownZoomOut,fadeSunOpacity} from '/scripts/solarSystem/sequenceAnim.js';
import {onMouseMove,onDocumentMouseClick} from '/scripts/solarSystem/mouse.js';
import {state} from '/scripts/solarSystem/state.js';

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

  // ******  Globals  ******


  // ******  SHOW PLANET INFO AFTER SELECTION  ******


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
    40,  // venus
    30,    // earth
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

  function animate() {

    //rotating planets around the sun and itself
    sun.rotateY(0.0015);


    for (const p of planets) {
      p.rotateSelf(p.planet, p.rotationSpeed, settings.acceleration);
      p.planet3d.rotateY(p.orbitSpeed * settings.accelerationOrbit);
    }

  if (state.hasMouseMove){
    raycaster.setFromCamera(state.mouse, camera);

    // Check for intersections
    var intersects = raycaster.intersectObjects(raycastTargets);

    // Reset all outlines
    outlinePass.selectedObjects = [];

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      outlinePass.selectedObjects = [intersectedObject];      
    }
  }

  // ******  ZOOM IN/OUT  ******
  if (state.isMovingTowardsPlanet) {
    camera.position.lerp(state.targetCameraPosition, 0.03);
    if (camera.position.distanceTo(state.targetCameraPosition) < 1) {
      state.isMovingTowardsPlanet = false;
    }
  } else if (state.isZoomingOut) {
    camera.position.lerp(zoomOutTargetPosition, 0.03);

    if (camera.position.distanceTo(zoomOutTargetPosition) < 1) {
        state.isZoomingOut = false;
        state.hoverEnabled = true;
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
    state.targetCameraPosition.copy(planetPosition).add(
      camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset)
    );
    
    camera.position.copy(state.targetCameraPosition);
  }

  function handleResize() {
  const pixelRatio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, true);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  if (fxaaPass) {
    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (width * pixelRatio),
      1 / (height * pixelRatio)
    );
  }

  renderer.render(scene, camera);
}

  async function handleZoomOut() {
    state.isZoomingOut = true;
    console.log("zoom out received!");

    fadeSunOpacity(sunMat, 1, 2000);
    settings.accelerationOrbit = 1;

    setTimeout(() => {
      sequentialReveal(planets, state.hoverEnabled, 500);
    }, 500);
  }

  window.addEventListener("planetChange", (event) => {
    planetChange(event);
  });

  canvas.addEventListener('mousemove', (e)=>{onMouseMove(e,camera,sun,planets,raycaster)}, false);
  canvas.addEventListener('click', (e)=>onDocumentMouseClick(e,raycaster,sun,sunMat,planets,camera,controls,outlinePass,offsets,settings,canvas), false);
  canvas.addEventListener('beginSunFade',(e) =>fadeSunOpacity(sunMat,e.detail.opacity,e.detail.duration));
  canvas.addEventListener('hideOutofViewPlanets',(e)=>sequentialHideUnselected(e.detail.selectedPlanet,planets));

  window.addEventListener('zoomOutNeeded', handleZoomOut);

  window.addEventListener('beginSunrise', () => {
    solarStartSunrise(sun);
  });

  window.addEventListener('solarTransformDownZoomOutCue', () => {solarTransformDownZoomOut(sun);});
  window.addEventListener('firstReveal', () => {sequentialReveal(planets, state.hoverEnabled, 1000);});
  window.addEventListener('resize', handleResize(renderer,camera,fxaaPass));
}





  


 