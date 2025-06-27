import {Vector2,Vector3} from 'three';

export const state = {
  isZoomingOut: false,
  isMovingTowardsPlanet: false,
  targetCameraPosition: new Vector3(),
  hoverEnabled: true,
  offset: 0,
  hasMouseMove: false,
  mouse: new Vector2()
  // you can add more shared flags here later
};

export const settings = {
    accelerationOrbit: 1,
    acceleration: 1,
    sunIntensity: 0
  };