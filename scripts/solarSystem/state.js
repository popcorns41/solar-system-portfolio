import * as THREE from 'three';

export const state = {
  isZoomingOut: false,
  isMovingTowardsPlanet: false,
  targetCameraPosition: new THREE.Vector3(),
  hoverEnabled: true,
  offset: 0,
  hasMouseMove: false,
  mouse: new THREE.Vector2()
  // you can add more shared flags here later
};

export const settings = {
    accelerationOrbit: 1,
    acceleration: 1,
    sunIntensity: 0
  };