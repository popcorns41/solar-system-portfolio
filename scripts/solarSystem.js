import * as THREE from 'three';

//script imports
import {initSetup,postProcessSetup,lightingSetup} from '/scripts/solarSystem/initCanvasSetup.js';
import {initSun,initPlanetObjects} from '/scripts/solarSystem/initPlanetObjects.js';
import {sequentialHideUnselected, sequentialReveal, solarStartSunrise,hideAllExceptSelected,fadeSunOpacity} from '/scripts/solarSystem/sequenceAnim.js';

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
  let pendingPlanetSelection = null;
  let isMovingTowardsPlanet = false;
  let targetCameraPosition = new THREE.Vector3();
  let hoverEnabled = true;
  let offset;
 

  function getPlanetIndex(selectedPlanet) {
    if (selectedPlanet === sun) return 0;
    if (selectedPlanet === mercury) return 1;
    if (selectedPlanet === venus) return 2;
    if (selectedPlanet === earth) return 3;
    if (selectedPlanet === mars) return 4;
    if (selectedPlanet === jupiter) return 5;
    if (selectedPlanet === saturn) return 6;
    
    return -1; // Return -1 if the planet isn't found
  }

  function onDocumentMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(raycastTargets);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const selectedPlanet = identifyPlanet(clickedObject);

      if (selectedPlanet) {
        window.planetIndex = getPlanetIndex(selectedPlanet);
        const indexAnnouncementEvent = new CustomEvent("solarSystemToInfoSection",
          {
            detail: {index: window.planetIndex}
          }
        )
        window.dispatchEvent(indexAnnouncementEvent);
        settings.accelerationOrbit = 0;

        const planetPosition = new THREE.Vector3();

        if (selectedPlanet === sun) {
          pendingPlanetSelection = sun;
        } else {
          fadeSunOpacity(sunMat, 0, 1000);
          pendingPlanetSelection = selectedPlanet;
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
        sequentialHideUnselected(pendingPlanetSelection, planets);
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


  function identifyPlanet(clickedObject) {

    if (mercury.planet && isDescendantOf(clickedObject, mercury.planet)) {
      offset = offsets[1];
      return mercury;
    } else if (clickedObject.material === sunMat) {
      offset = offsets[0];
      return sun;
    } else if (venus.planet && isDescendantOf(clickedObject, venus.planet)) {
      offset = offsets[2];
      return venus;
    } else if (clickedObject.material === earth.planet.material) {
      offset = offsets[3];
      return earth;
    } else if (mars.planet && isDescendantOf(clickedObject, mars.planet)) {
      offset = offsets[4];
      return mars;
    } else if (jupiter.planet && isDescendantOf(clickedObject, jupiter.planet)) {
      offset = offsets[5];
      return jupiter;
    } else if (saturn.planet && isDescendantOf(clickedObject, saturn.planet)) {
      offset = offsets[6];
      return saturn;
    }

    return null;
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




  const indexOrderofPlanets = [
    { name: "Sun", mesh: sun },
    { name: "Mercury", mesh: mercury.planet },
    { name: "Venus", mesh: venus.planet },
    { name: "Earth", mesh: earth.planet },
    { name: "Mars", mesh: mars.planet },
    { name: "Jupiter", mesh: jupiter.planet },
    { name: "Saturn", mesh: saturn.planet }
  ];

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
      p.planet.rotateY(p.rotationSpeed * settings.acceleration);
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

      if (pendingPlanetSelection) {
        pendingPlanetSelection = null;
      }
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

  window.addEventListener('solarTransformDownZoomOutCue', () => {solarTransformDownZoomOut();});
  window.addEventListener('firstReveal', () => {sequentialReveal(planets, hoverEnabled, 1000);});

  window.addEventListener('zoomOutNeeded', async () => {
    isZoomingOut = true;
    console.log("zoom out received!");
    fadeSunOpacity(sunMat, 1, 2000);
    settings.accelerationOrbit = 1;

    setTimeout(() => {
      sequentialReveal(planets, hoverEnabled, 500);
    }, 500); // optional pause
  });

  window.addEventListener('beginSunrise', () => {
    solarStartSunrise(sun);
  });

  window.addEventListener("planetChange", (event) => {
    const index = event.detail.index;
    const selected = indexOrderofPlanets[index];
    const offset = offsets[index];

    hideAllExceptSelected(index, indexOrderofPlanets);

    selected.mesh.visible = true;
    selected.mesh.traverse(child => {
    child.visible = true; // <- make child renderable
    if (child.material) {
      child.material.transparent = true;
      child.material.opacity = 1;
    }
  });
    const planetPosition = new THREE.Vector3();
    selected.mesh.getWorldPosition(planetPosition);

    // Update camera target and position

    controls.target.copy(planetPosition);
    camera.lookAt(planetPosition);
    targetCameraPosition.copy(planetPosition).add(
      camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset)
    );
    
    camera.position.copy(targetCameraPosition);
    
    console.log(`Camera updated to: ${selected.name}`);
  });

  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('click', onDocumentMouseClick, false);

  function handleResize() {
    const canvas = document.getElementById("threeCanvas");
    const pixelRatio = renderer.getPixelRatio();

    // Get current transform (e.g. scale + translate from animation)
    const currentTransform = window.getComputedStyle(canvas).transform;

    // Temporarily clear transform so we can measure properly
    canvas.style.transform = "none";
    const rectBefore = canvas.getBoundingClientRect();

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

  window.addEventListener('resize', handleResize);
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






  


 