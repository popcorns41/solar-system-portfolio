export function handleResize(camera,renderer) {
  const canvas = document.getElementById("threeCanvas");

  // Get current transform (e.g. scale + translate from animation)
  const currentTransform = window.getComputedStyle(canvas).transform;

  // Temporarily clear transform so we can measure properly
  canvas.style.transform = "none";

  // Resize Three.js renderer and camera
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Reset and reapply original transform
  canvas.style.transform = currentTransform;

  // Optionally, re-calculate new position based on rectBefore if you want more precise adjustment
}