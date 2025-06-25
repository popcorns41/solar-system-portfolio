export function solarStartSunrise(sun) {
    const startY = sun.position.y;
    const targetY = 45;
    const duration = 8000;
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

export  function fadeSunOpacity(sunMat,targetOpacity, duration = 1000) {
    if (!sunMat) return;

    sunMat.transparent = true;
    const startOpacity = sunMat.opacity;
    const startTime = performance.now();

    function fadeStep(currentTime) {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = t * t * (3 - 2 * t); // smoothstep easing

      sunMat.opacity = startOpacity + (targetOpacity - startOpacity) * easedT;

      if (t < 1) {
        requestAnimationFrame(fadeStep);
      }
    }

    requestAnimationFrame(fadeStep);
  }

export function hideAllExceptSelected(selectedIndex,indexOrderofPlanets) {
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

export function sequentialHideUnselected(selectedPlanet, planets, delay = 300) {
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

  export function sequentialReveal(planets, hoverEnabled, delay = 1000) {
    planets.forEach((planet, index) => {
      setTimeout(() => {
        revealPlanet(planet);

        // After the last planet, fire the event
        if (index === planets.length - 1) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent("planetsInView"));
            hoverEnabled = true;
          }, delay); // wait for the final reveal animation
        }

      }, index * delay);
    });
  }

  //helper functions

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

    const duration = 800;
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