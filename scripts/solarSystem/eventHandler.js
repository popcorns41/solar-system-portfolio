export function planetChange(event,planets,controls,camera,offsets){
    const index = event.detail.index;
    let selected;
    // Determine the selected planet based on the index
    if (index == 0) {
      selected = sun;
    }else{
      selected = planets[index - 1];
    }
    state.offset = offsets[index];

    sequentialHideUnselected(selected, planets,0);

    selected.planet.visible = true;
    selected.planet.traverse(child => {
    child.visible = true; // <- make child renderable
    if (child.material) {
      child.material.transparent = true;
      child.material.opacity = 1;
    }
  });
    const planetPosition = new THREE.Vector3();
    selected.planet.getWorldPosition(planetPosition);

    // Update camera target and position

    controls.target.copy(planetPosition);
    camera.lookAt(planetPosition);
    state.targetCameraPosition.copy(planetPosition).add(
      camera.position.clone().sub(planetPosition).normalize().multiplyScalar(state.offset)
    );
    
    camera.position.copy(state.targetCameraPosition);
  }

  export async function handleZoomOut(canvas,settings) {
    state.isZoomingOut = true;
    console.log("zoom out received!");
    const bringBackSunEvent = new CustomEvent("changeSunOpacity",{
      detail:{opacity:1,duration:2000}
    });
    canvas.dispatchEvent(bringBackSunEvent);
    settings.accelerationOrbit = 1;

    const revealEvent = new  CustomEvent("revealPlanets",{
        detail: {delay:1000}
      });
    setTimeout(() => {
      window.dispatchEvent(revealEvent);
    }, 500);
  }

  export function handleResize(renderer,camera,fxaaPass) {
  const pixelRatio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height, true);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  if (fxaaPass) {
    fxaaPass.material.uniforms['resolution'].value.set(
      1 / (width * pixelRatio),
      1 / (height * pixelRatio)
    );
  }
}