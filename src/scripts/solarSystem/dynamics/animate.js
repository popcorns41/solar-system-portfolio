import { updatePlanetRotation } from './update/updatePlanetRotation.js';
import { updateOutlines } from './update/updateOutlines.js';
import { updateZoom } from './update/updateZoom.js';
import { state } from './state.js';

export function animate(outlinePass,camera, scene, planets, raycaster, raycastTargets,controls,composer) {
  requestAnimationFrame(() => animate(outlinePass,camera, scene, planets, raycaster, raycastTargets));

  updatePlanetRotation(planets, state.settings);
  updateOutlines(outlinePass,state.mouse, camera, raycaster, raycastTargets, state.hasMouseMove, planets);
  updateZoom(camera);

  controls.update();
  composer.render();
}