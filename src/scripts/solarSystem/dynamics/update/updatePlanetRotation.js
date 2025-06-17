import { state } from "../../../state.js";

export function updatePlanetRotation(planets) {
  planets.sun.rotateY(0.001);
  
  const orbits = [
    { key: "mercury", self: 0.003, orbit: 0.002 },
    { key: "venus", self: 0.005, orbit: 0.0006 },
    { key: "earth", self: 0.005, orbit: 0.001 },
    { key: "mars", self: 0.008, orbit: 0.0015 },
    { key: "jupiter", self: 0.005, orbit: 0.0003 },
    { key: "saturn", self: 0.01, orbit: 0.0002 }
  ];

  orbits.forEach(({ key, self, orbit }) => {
    planets[key].planet.rotateY(self * state.acceleration);
    planets[key].planet3d.rotateY(orbit * state.accelerationOrbit);
  });
}