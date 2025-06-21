export function updateOutlines(outlinePass,mouse, camera, hasMouseMove) {
  if (!mouse.hasMouseMove) return;

  const raycaster = mouse.raycaster;

  raycaster.setFromCamera(mouse.mousePosition, camera);
  const intersects = raycaster.intersectObjects(mouse.raycastTargets);
  outlinePass.selectedObjects = [];

  if (intersects.length > 0) {
    const intersected = intersects[0].object;
    outlinePass.selectedObjects = [intersected];
  }
}