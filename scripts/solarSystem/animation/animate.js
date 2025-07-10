import {state,settings} from '/scripts/solarSystem/core/state.js';
import {zoomOutTargetPosition} from '/scripts/solarSystem/core/const.js'

export const animate = (sun,planets,mouseHandler,outlinePass,camera,controls,composer) =>{
     //rotating planets around the sun and itself
    sun.rotateY(0.0015 * settings.acceleration);


    for (const p of planets) {
      p.rotateSelf(p.planet, p.rotationSpeed, settings.acceleration);
      p.planet3d.rotateY(p.orbitSpeed * settings.accelerationOrbit);
    }
     mouseHandler.raycaster.setFromCamera(state.ndcRange, camera);

    // Check for intersections
    var intersects = mouseHandler.raycaster.intersectObjects(mouseHandler.raycastTargets);
    const card = document.getElementById('hoverCard');

    outlinePass.selectedObjects = [];

    if (state.hasMouseMove){
      if ((intersects.length > 0) && (state.hoverEnabled == true)) {
        const intersectedObject = intersects[0].object;
        outlinePass.selectedObjects = [intersectedObject];
        mouseHandler.updateCardForHoveredObject(intersectedObject,card);  

        card.style.left = `${mouseHandler.clientMouse.x + 10}px`;
        card.style.top = `${mouseHandler.clientMouse.y + 10}px`;
        card.style.display = 'block';
    }else {
      card.innerText = "";
       card.style.display = "none";
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
    composer.render();
    requestAnimationFrame(()=>animate(sun,planets,mouseHandler,outlinePass,camera,controls,composer));

  };