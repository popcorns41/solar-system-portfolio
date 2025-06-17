export function updateOutlines(outlinePass,mouse, camera, raycaster, raycastTargets, hasMouseMove, planets) {
  if (!hasMouseMove) return;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(raycastTargets);
  outlinePass.selectedObjects = [];

  if (intersects.length > 0) {
    const intersected = intersects[0].object;
    if (intersected === planets.earth) {
      outlinePass.selectedObjects = [planets.earth.planet];
    } else if (intersected === planets.venus.Atmosphere) {
      outlinePass.selectedObjects = [planets.venus.planet];
    } else {
      outlinePass.selectedObjects = [intersected];
    }
  }
}