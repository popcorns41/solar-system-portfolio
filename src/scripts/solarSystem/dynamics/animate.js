import { updatePlanetRotation } from './updateFunctions/updatePlanetRotation.js';
import { updateOutlines } from './updateFunctions/updateOutlines.js';
import { updateZoom } from './updateFunctions/updateZoom.js';


export function animate(mouse,outlinePass,camera, scene, planets,sun,raycastTargets,controls,composer) {
  requestAnimationFrame(() => animate(mouse, outlinePass, camera, scene, planets, sun, raycastTargets, controls, composer));

  updatePlanetRotation(planets,sun);
  updateOutlines(outlinePass, mouse, camera, raycastTargets, mouse.hasMouseMove, planets);
  updateZoom(camera);

  controls.update();
  composer.render();
}