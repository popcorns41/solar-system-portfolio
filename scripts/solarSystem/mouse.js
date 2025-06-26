import * as THREE from 'three';
import {state} from '/scripts/solarSystem/state.js';

export function onMouseMove(event,camera,sun,planets,raycaster) {
    if (!state.hoverEnabled) return;

    state.hasMouseMove = true;
    event.preventDefault();
    state.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    state.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(state.mouse, camera);
    const raycastTargets = planets.flatMap(p => p.meshes);
    raycastTargets.unshift(sun);
    
    const intersects = raycaster.intersectObjects(raycastTargets);

    const card = document.getElementById('hoverCard');

    if (intersects.length > 0) {
        const object = intersects[0].object;

        // Position the card near the cursor
        card.style.left = `${event.clientX + 10}px`;
        card.style.top = `${event.clientY + 10}px`;
        card.style.display = 'block';

        if (object) {
            updateCardForHoveredObject(object,card,sun,planets);
        }
    }else{
        card.innerText = "";
        card.style.display = "none";
    }
  }

export function onDocumentMouseClick(event,raycaster,sun,sunMat,planets,camera,controls,outlinePass,offsets,settings,canvas) {
      event.preventDefault();
  
      state.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      state.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  
      raycaster.setFromCamera(state.mouse, camera);
      const raycastTargets = planets.flatMap(p => p.meshes);
    raycastTargets.unshift(sun);
    
      const intersects = raycaster.intersectObjects(raycastTargets);
  
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const selectedPlanetIndex = identifyPlanet(clickedObject,sunMat, planets);
        let selectedPlanet = null;
        if (selectedPlanetIndex === 0) {
          selectedPlanet = sun;
        } else if (selectedPlanetIndex > 0) {
          selectedPlanet = planets[selectedPlanetIndex - 1];
        }
  
        if (selectedPlanet) {
          window.planetIndex = selectedPlanetIndex;
          state.offset = offsets[selectedPlanetIndex];
          const indexAnnouncementEvent = new CustomEvent("solarSystemToInfoSection",
            {
              detail: {index: window.planetIndex}
            }
          )
          window.dispatchEvent(indexAnnouncementEvent);
          settings.accelerationOrbit = 0;
  
          const planetPosition = new THREE.Vector3();
  
          if (!(selectedPlanet === sun)) {
            const fadeSunRequiredAnnouncement = new CustomEvent("beginSunFade",
                {
                    detail: {opacity: 0,duration: 1000}

                }
            );
            canvas.dispatchEvent(fadeSunRequiredAnnouncement);
            //fadeSunOpacity(sunMat, 0, 1000);
            selectedPlanet.planet.getWorldPosition(planetPosition);
          }
  
          window.dispatchEvent(new CustomEvent("circularBorder"));
          
          state.isMovingTowardsPlanet = true;
          controls.target.copy(planetPosition);
          camera.lookAt(planetPosition);
          state.targetCameraPosition.copy(planetPosition).add(
            camera.position.clone().sub(planetPosition).normalize().multiplyScalar(state.offset)
          );
          // Wait for sequential hide to complete before moving camera
          const sequentialHideEvent = new CustomEvent("hideOutofViewPlanets",
                {
                    detail: {selectedPlanet: selectedPlanet}
                }
            );
            canvas.dispatchEvent(sequentialHideEvent);
          //sequentialHideUnselected(selectedPlanet, planets);
          setTimeout(()=>{
            window.dispatchEvent(new CustomEvent("beginPlanetTransform"));
          },1000)
  
          state.hoverEnabled = false;
          state.hasMouseMove = false;
          document.getElementById('hoverCard').style.display = 'none';
          outlinePass.selectedObjects = [];
        }
      }
    }

    //helper functions

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

  function updateCardForHoveredObject(object,card,sun,planets) {

  // Check sun first (not in planets array)
  if (object === sun) {
    card.innerText = "Contact me";
    card.style.display = 'block';
    return;
  }

  // Check planets array
  for (const planet of planets) {
    if (planet.meshes.includes(object)) {
      card.innerText = planet.label;
      card.style.display = "block";
      return;
    }
  }

  console.log(object,"not found!");
  // Default fallback if nothing matches
  card.innerText = "";
  card.style.display = "none";
}