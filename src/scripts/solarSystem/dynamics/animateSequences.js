import { offsets } from "../fixedValues/offsets";
import { state } from "../core/state";

const animationSettings = {
    revealPlanetDuration: 800, // Duration for planet reveal animation in milliseconds
    sunRiseDuration: 6000, // Duration for sun rise animation in milliseconds
    sunZoomDuration: 2500 // Duration for sun zoom animation in milliseconds
};


function revealPlanet(planetGroup) {
  planetGroup.visible = true;

  planetGroup.traverse(child => {
    if ((child.isMesh || child.isLine) && child.material) {
      child.visible = true;

      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach(mat => {
        mat.transparent = true;

        // Force reset opacity in case it’s stuck
        mat.opacity = 0;

        // Reset potential side-effects
        if (mat.depthWrite === false) mat.depthWrite = true;
        if (mat.color && mat.color.a !== undefined) mat.color.a = 1.0;
      });

      const duration = animationSettings.revealPlanetDuration;
      const startTime = performance.now();

      function fade(currentTime) {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * t * (3 - 2 * t); // smoothstep

        materials.forEach(mat => {
          mat.opacity = easedT;
        });

        if (t < 1) {
          requestAnimationFrame(fade);
        }
      }

      requestAnimationFrame(fade);
    }
  });
}

export function sequentialReveal(delay = 1000,planets) {
  const planet3ds = Object.values(planets).map(p => p.planet3d);
  planet3ds.forEach((planet3d, index) => {
    setTimeout(() => {
      revealPlanet(planet3d);

      // After the last planet, fire the event
      if (index === planet3ds.length - 1) {
        setTimeout(() => {
          console.log("All planets revealed");
          window.dispatchEvent(new CustomEvent("planetsInView"));
          hoverEnabled = true;
        }, delay); // wait for the final reveal animation
      }

    }, index * delay);
  });
}

export function solarStartSunrise(sun) {
  const startY = sun.position.y;
  const targetY = 45;
  const duration = animationSettings.sunRiseDuration;
  const startTime = performance.now();

  function rise(currentTime) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);

    // Eased movement (cubic ease-out)
    const easedT = 1 - Math.pow(1 - t, 2);
    
    sun.position.y = startY + (targetY - startY) * easedT;

    if (t < 1) {
      requestAnimationFrame(rise);
    }else{
      window.dispatchEvent(new CustomEvent("sunRose"));
    }
  }

  requestAnimationFrame(rise);
}

export function solarTransformDownZoomOut(sun) {
  const startY = sun.position.y;
  const targetY = 0;

  const startScale = sun.scale.x; // assumed uniform scale
  const targetScale = 1;

  const duration = animationSettings.sunZoomDuration; // ms
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    const easedT = t * t * (3 - 2 * t); // smoothstep easing

    // Position
    sun.position.y = startY + (targetY - startY) * easedT;

    // Scale
    const scale = startScale + (targetScale - startScale) * easedT;
    sun.scale.set(scale, scale, scale);

    if (t < 1) {
      requestAnimationFrame(animate);
    }else{
      window.dispatchEvent(new CustomEvent("sunZoomComplete"));
    }
  }

  requestAnimationFrame(animate);
}

function hideAllExceptSelected(selectedIndex, indexOrderofPlanets) {
  if (selectedIndex < 0 || selectedIndex >= indexOrderofPlanets.length) {
    console.warn("Invalid selected index:", selectedIndex);
    return;
  }
  indexOrderofPlanets.forEach((planetObj, index) => {
    const mesh = planetObj.mesh;

    if (!mesh) return;

    const isSelected = index === selectedIndex;

    mesh.traverse(child => {
      if ((child.isMesh || child.isLine) && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach(mat => {
          mat.transparent = true;
          mat.opacity = isSelected ? 1 : 0;
        });

        child.visible = true; // Always keep children visible to prevent render bugs
      }
    });

    // Orbits are optional; show only for selected planet
    if (planetObj.orbit) {
      planetObj.orbit.visible = isSelected;
    }
  });
}

export function planetChangeEventHandler(event,camera,indexOrderofPlanets){
    const index = event.detail.index;
      const selected = indexOrderofPlanets[index];
      const offset = offsets[index];
      state.offset = offset;
    
      hideAllExceptSelected(index, indexOrderofPlanets);
    
      selected.mesh.visible = true;
      selected.mesh.traverse(child => {
      child.visible = true; // <- make child renderable
      if (child.material) {
        child.material.transparent = true;
        child.material.opacity = 1;
      }
    });
      const planetPosition = new THREE.Vector3();
      selected.mesh.getWorldPosition(planetPosition);
    
      // Update camera target and position
    
      controls.target.copy(planetPosition);
      camera.lookAt(planetPosition);
      targetCameraPosition.copy(planetPosition).add(
        camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset)
      );
      
      camera.position.copy(targetCameraPosition);

}

function hidePlanet(planetGroup) {
  return new Promise((resolve) => {
    planetGroup.traverse(child => {
      if (child.isMesh || child.isLine) {
        child.material.transparent = true;

        const duration = 200;
        const startTime = performance.now();

        function fade(currentTime) {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1);
          const easedT = 1 - (t * t * (3 - 2 * t)); // smoothstep fade-out

          child.material.opacity = easedT;

          if (t < 1) {
            requestAnimationFrame(fade);
          } else {
            child.visible = false;
            resolve(); 
          }
        }

        requestAnimationFrame(fade);
      }
    });
  });
}

export function sequentialHideUnselected(selectedPlanet,planets, delay = 300) {
  for (let i = planets.length - 1; i >= 0; i--) {
    const planet3d = planets[i];
    const isSelected = planet3d === selectedPlanet.planet3d;

    setTimeout(() => {
      if (isSelected) {
        if (selectedPlanet.orbit && selectedPlanet.orbit.material) {
          const orbitMaterial = selectedPlanet.orbit.material;
          orbitMaterial.transparent = true;

          const duration = 1000;
          const startTime = performance.now();

          function fadeOrbit(currentTime) {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            const easedT = t * t * (3 - 2 * t);

            orbitMaterial.opacity = 1 - easedT;

            if (t < 1) {
              requestAnimationFrame(fadeOrbit);
            } else {
              selectedPlanet.orbit.visible = false;
            }
          }

          requestAnimationFrame(fadeOrbit);
        }
      } else {
        hidePlanet(planet3d);
      }
    }, (planets.length - 1 - i) * delay); // reverse order
  }
}