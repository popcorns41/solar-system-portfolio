import {Vector2,Vector3} from 'three';

export const state = {
  isZoomingOut: false,
  isMovingTowardsPlanet: false,
  targetCameraPosition: new Vector3(),
  hoverEnabled: false,
  hasMouseMove: false,
  offset: 0,
  ndcRange: new Vector2()
  // you can add more shared flags here later
};

export const settings = {
    accelerationOrbit: 0,
    acceleration: 1
  };