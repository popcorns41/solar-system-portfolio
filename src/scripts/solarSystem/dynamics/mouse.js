import {state} from "./solarSystem/core/state.js";
import { offsets } from "../fixedValues/offsets.js";

export function createRaycaster(){
    const raycaster = new THREE.Raycaster();
    return {raycaster}
}

export function onMouseMove(event,raycaster,camera,raycastTargets) {
    if (!state.hoverEnabled) return;
    event.preventDefault();
    state.hasMouseMove = true;

    state.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    state.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(state.mouse, camera);
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

export function onDocumentMouseDown(event,raycaster,camera,raycastTargets) {
  event.preventDefault();

  isHomeButtonView = true;

  state.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  state.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(state.mouse, camera);
  const intersects = raycaster.intersectObjects(raycastTargets);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const selectedPlanet = identifyPlanet(clickedObject,raycastTargets);

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
        state.pendingPlanetSelection = sun;
      } else {
        fadeSunOpacity(0,1000);
        state.pendingPlanetSelection = selectedPlanet;
        selectedPlanet.planet.getWorldPosition(planetPosition);
      }

      window.dispatchEvent(new CustomEvent("circularBorder"));

      state.isMovingTowardsPlanet = true;
      controls.target.copy(planetPosition);
      camera.lookAt(planetPosition);
      targetCameraPosition.copy(planetPosition).add(
        camera.position.clone().sub(planetPosition).normalize().multiplyScalar(state.offset)
      );
      // Wait for sequential hide to complete before moving camera
      sequentialHideUnselected(state.pendingPlanetSelection);
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

function identifyPlanet(clickedObject, raycastTargets) {
  if (clickedObject.material === sunMat) {
    state.offset = offsets[0];
    return sun;
  } else if (mercury.planet && isDescendantOf(clickedObject, mercury.planet)) {
    state.offset = offsets[1];
    return mercury;
  } else if (venus.planet && isDescendantOf(clickedObject, venus.planet)) {
    state.offset = offsets[2];
    return venus;
  } else if (clickedObject.material === earth.planet.material) {
    state.offset = offsets[3];
    return earth;
  } else if (mars.planet && isDescendantOf(clickedObject, mars.planet)) {
    state.offset = offsets[4];
    return mars;
  } else if (jupiter.planet && isDescendantOf(clickedObject, jupiter.planet)) {
    state.offset = offsets[5];
    return jupiter;
  } else if (saturn.planet && isDescendantOf(clickedObject, saturn.planet)) {
    state.offset = offsets[6];
    return saturn;
  }

  return null;
}

