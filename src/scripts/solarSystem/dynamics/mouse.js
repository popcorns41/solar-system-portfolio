import {state} from 'src/scripts/solarSystem/core/state.js';
import { offsets } from 'src/scripts/solarSystem/fixedValues/offsets.js';

import * as THREE from 'three';


function isDescendantOf(object, potentialAncestor) {
  let current = object;
  while (current) {
    if (current === potentialAncestor) return true;
    current = current.parent;
  }
  return false;
}

function identifyPlanet(clickedObject) {
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

export class MouseHandler {
  constructor(camera, raycastTargets) {
    this.raycastTargets = raycastTargets;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isZoomingOut = false;
    this.isMovingTowardsPlanet = false;
    this.targetCameraPosition = new THREE.Vector3();
    this.zoomOutTargetPosition = new THREE.Vector3();
    this.pendingPlanetSelection = null;
    this.hasMouseMove = false;
    this.hoverEnabled = true;
    this.camera = camera;
  }

  onMouseMove(event) {
    if (!this.hoverEnabled) return;
    event.preventDefault();
    this.hasMouseMove = true;

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastTargets);

    const card = document.getElementById('hoverCard');

    if (intersects.length > 0) {
      const object = intersects[0].object;

      // Position the card near the cursor
      card.style.left = `${event.clientX + 10}px`;
      card.style.top = `${event.clientY + 10}px`;
      card.style.display = 'block';

      //Mouse has no reference to planets!! 


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
  onDocumentMouseDown(event){
    event.preventDefault();

    isHomeButtonView = true;

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastTargets);

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
        state.accelerationOrbit = 0;

        const planetPosition = new THREE.Vector3();

        if (selectedPlanet === sun) {
          this.pendingPlanetSelection = sun;
        } else {
          fadeSunOpacity(0,1000);
          this.pendingPlanetSelection = selectedPlanet;
          selectedPlanet.planet.getWorldPosition(planetPosition);
        }

        window.dispatchEvent(new CustomEvent("circularBorder"));

        this.isMovingTowardsPlanet = true;
        controls.target.copy(planetPosition);
        camera.lookAt(planetPosition);
        targetCameraPosition.copy(planetPosition).add(
          camera.position.clone().sub(planetPosition).normalize().multiplyScalar(state.offset)
        );
        // Wait for sequential hide to complete before moving camera
        sequentialHideUnselected(this.pendingPlanetSelection);
        //dispatch event to begin sequentialHideUnselected, attaching this.pendingPlanetSelection
        canvas.dispatchEvent(new CustomEvent("beginSequentialHide", {
          detail: {selectedPlanet: this.pendingPlanetSelection}
        }));
        this.pendingPlanetSelection = null;

        setTimeout(()=>{
          window.dispatchEvent(new CustomEvent("beginPlanetTransform"));
        },1000)

        this.hoverEnabled = false;
        this.hasMouseMove = false;
        document.getElementById('hoverCard').style.display = 'none';
        outlinePass.selectedObjects = []; 
      }
    }
  }
}

//add this statements!


