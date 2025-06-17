import { state } from './solarSystem/core/state.js';

export function updateZoom(camera) {
  if (state.isMovingTowardsPlanet) {
    camera.position.lerp(state.targetCameraPosition, 0.03);
    if (camera.position.distanceTo(state.targetCameraPosition) < 1) {
      state.isMovingTowardsPlanet = false;
      state.pendingPlanetSelection = null;
    }
  } else if (state.isZoomingOut) {
    camera.position.lerp(state.zoomOutTargetPosition, 0.03);
    if (camera.position.distanceTo(state.zoomOutTargetPosition) < 1) {
      state.isZoomingOut = false;
    }
  }
}