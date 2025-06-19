import { state } from '/scripts/solarSystem/core/state.js';

export function updatePlanetRotation(planets,sun) {
  sun.rotateY(0.001);
  planets.mercury.planet.rotateZ(0.003 * state.acceleration);
  planets.mercury.planet3d.rotateY(0.002 * state.accelerationOrbit);
  planets.venus.planet.rotateY(0.005 * state.acceleration);
  planets.venus.planet3d.rotateY(0.0006 * state.accelerationOrbit);
  planets.earth.planet.rotateY(0.005 * state.acceleration);
  planets.earth.planet3d.rotateY(0.001 * state.accelerationOrbit);
  planets.mars.planet.rotateY(0.008 * state.acceleration);
  planets.mars.planet3d.rotateY(0.0015 * state.accelerationOrbit);
  planets.jupiter.planet.rotateY(0.005 * state.acceleration);
  planets.jupiter.planet3d.rotateY(0.0003 * state.accelerationOrbit);
  planets.saturn.planet.rotateY(0.01 * state.acceleration);
  planets.saturn.planet3d.rotateY(0.0002 * state.accelerationOrbit);
}