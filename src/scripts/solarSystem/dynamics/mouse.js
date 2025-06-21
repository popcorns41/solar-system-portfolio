import * as THREE from 'three';
import { state } from 'src/scripts/solarSystem/core/state.js';


export class MouseHandler {
  constructor(camera, raycastTargets,planetRegistry,controls,outlinePass) {
    this.raycastTargets = raycastTargets;
    this.outlinePass = outlinePass;
    this.controls = controls;
    this.planetRegistry = planetRegistry;
    this.raycaster = new THREE.Raycaster();
    this.mousePosition = new THREE.Vector2();
    this.isZoomingOut = false;
    this.isMovingTowardsPlanet = false;
    this.targetCameraPosition = new THREE.Vector3();
    this.zoomOutTargetPosition = new THREE.Vector3();
    this.pendingPlanetSelection = null;
    this.hasMouseMove = false;
    this.camera = camera;
  }

  onMouseMove(event) {
    if (!state.hoverEnabled) return;
    event.preventDefault();
    this.hasMouseMove = true;

    this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastTargets);

    const card = document.getElementById('hoverCard');

    if (intersects.length > 0) {
      const object = intersects[0].object;

      // Position the card near the cursor
      card.style.left = `${event.clientX + 10}px`;
      card.style.top = `${event.clientY + 10}px`;
      card.style.display = 'block';

      //Mouse has no reference to planets!! 

      updateCardText(object, this.planetRegistry, card);
    }else {
      // No object hovered — explicitly hide card
      card.style.display = 'none';
    }
  }
  onDocumentMouseDown(event){
    event.preventDefault();

    //isHomeButtonView = true;

    this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = - (event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    const intersects = this.raycaster.intersectObjects(this.raycastTargets);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const selectedPlanet = identifyPlanet(clickedObject,this.planetRegistry);

      if (selectedPlanet) {
        window.planetIndex = getPlanetIndex(selectedPlanet,this.planetRegistry);
        const indexAnnouncementEvent = new CustomEvent("solarSystemToInfoSection",
          {
            detail: {index: window.planetIndex}
          }
        )
        window.dispatchEvent(indexAnnouncementEvent);
        state.accelerationOrbit = 0;

        const planetPosition = new THREE.Vector3();

        if (selectedPlanet === this.planetRegistry[0].object) { // Assuming the first object is the sun
          const sun = this.planetRegistry[0].object;
          this.pendingPlanetSelection = sun;
        } else {
          //no reference to fadeSunOpacity yet!
            window.dispatchEvent(new CustomEvent("fadeSunOpacity", {
              detail: {duration: 1000 }
            }));
          this.pendingPlanetSelection = selectedPlanet;
          selectedPlanet.planet.getWorldPosition(planetPosition);
        }

        window.dispatchEvent(new CustomEvent("circularBorder"));

        this.isMovingTowardsPlanet = true;
        this.controls.target.copy(planetPosition);
        this.camera.lookAt(planetPosition);
        this.targetCameraPosition.copy(planetPosition).add(
          this.camera.position.clone().sub(planetPosition).normalize().multiplyScalar(state.offset)
        );
        // Wait for sequential hide to complete before moving camera
        //sequentialHideUnselected(this.pendingPlanetSelection);
        //dispatch event to begin sequentialHideUnselected, attaching this.pendingPlanetSelection
        window.dispatchEvent(new CustomEvent("beginSequentialHide", {
          detail: {selectedPlanet: this.pendingPlanetSelection}
        }));
        this.pendingPlanetSelection = null;

        setTimeout(()=>{
          window.dispatchEvent(new CustomEvent("beginPlanetTransform"));
        },1000)

        state.hoverEnabled = false;
        this.hasMouseMove = false;
        
        document.getElementById('hoverCard').style.display = 'none';
        this.outlinePass.selectedObjects = []; 
      }
    }
  }
  updateZoom() {
    if (this.isMovingTowardsPlanet) {
      this.camera.position.lerp(this.targetCameraPosition, 0.03);
      if (this.camera.position.distanceTo(this.targetCameraPosition) < 1) {
        this.isMovingTowardsPlanet = false;
        this.pendingPlanetSelection = null;
      }
    } else if (this.isZoomingOut) {
      this.camera.position.lerp(this.zoomOutTargetPosition, 0.03);
      if (this.camera.position.distanceTo(this.zoomOutTargetPosition) < 1) {
        this.isZoomingOut = false;
      }
    }
  }
}

//helper functions

function getPlanetIndex(selectedPlanet,planetRegistry) {
  return planetRegistry.findIndex(entry => entry.object === selectedPlanet);
}

function identifyPlanet(obj,planetRegistry) {
    for (const { object, offset, match } of planetRegistry) {
      if (match(obj)) {
        state.offset = offset;
        return object;
      }
    }
    return null;
  };

  function updateCardText(object, planetRegistry, card) {
  const textMap = {
    sun: "Contact me",
    mercury: "Resume",
    venus: "Skill sets",
    earth: "Robotics",
    mars: "Extracurricular",
    jupiter: "Childhood",
    saturn: "About me"
  };

  let matchFound = false;

  for (const entry of planetRegistry) {
    const { name, object: planetObj } = entry;

    if (name === 'sun' && object === planetObj) {
      card.innerText = textMap[name];
      matchFound = true;
      break;
    }

    if (planetObj.meshes?.includes(object)) {
      card.innerText = textMap[name];
      matchFound = true;
      break;
    }

    if (planetObj.planet === object || planetObj.Atmosphere === object) {
      card.innerText = textMap[name];
      matchFound = true;
      break;
    }
  }

  if (matchFound) {
    card.style.display = 'block';
  } else {
    card.innerText = '';
    card.style.display = 'none';
  }
}


