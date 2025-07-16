import {state,settings,sunZoomState} from '/scripts/solarSystem/core/state.js';
import {zoomOutTargetPosition} from '/scripts/solarSystem/core/const.js'

export const animate = (sun,planets,mouseHandler,outlinePass,camera,controls,composer) =>{
  // ******  sequenceAnimations  ******
  if (sunZoomState.active) {
    const elapsed = time - sunZoomState.startTime;
    const t = Math.min(elapsed / sunZoomState.duration, 1);
    const easedT = t * t * (3 - 2 * t); // smoothstep

    // Update position and scale
    sun.position.y = sunZoomState.startY + (sunZoomState.targetY - sunZoomState.startY) * easedT;
    const scale = sunZoomState.startScale + (sunZoomState.targetScale - sunZoomState.startScale) * easedT;
    sun.scale.set(scale, scale, scale);

    if (t >= 1) {
      sunZoomState.active = false;
      window.dispatchEvent(new CustomEvent("sunZoomComplete"));
    }
  }
  
  // ******  ROTATION  ******
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

        document.body.style.cursor = 'pointer';

        outlinePass.selectedObjects = [intersectedObject];
        mouseHandler.updateCardForHoveredObject(intersectedObject,card);  


        card.style.left = `${mouseHandler.clientMouse.x + 10}px`;
        card.style.top = `${mouseHandler.clientMouse.y + 10}px`;
        card.style.display = 'block';
    }else {
      card.innerText = "";
      card.style.display = "none";
      document.body.style.cursor = 'default';
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
    }
  }

    controls.update();
    composer.render();
    requestAnimationFrame(()=>animate(sun,planets,mouseHandler,outlinePass,camera,controls,composer));

  };