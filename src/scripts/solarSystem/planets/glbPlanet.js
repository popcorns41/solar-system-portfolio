import * as THREE from 'three';
import { loadGLB } from '../planets/modelCache.js';

export async function createglbPlanet(name,path,position,scale){
  const planet = await loadGLB(path);
  
  planet.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        map: child.material.map,
        color: child.material.color,
      });
      child.geometry.computeVertexNormals();
    }
  });

  const planet3d = new THREE.Object3D;
  const planetSystem = new THREE.Group();
  planetSystem.add(planet);

  planet.position.x = position;
  planet.scale.set(scale,scale,scale);

  const orbitPath = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    position, position, // xRadius, yRadius
    0, 2 * Math.PI,   // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
  );

  const pathPoints = orbitPath.getPoints(100);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });
  const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  planet.orbit = orbit;

  planetSystem.add(orbit);

  planet3d.add(planetSystem);

  let meshes = [];
  planet.traverse(child => {
    if (child.isMesh) {
      // child.material.emissive = new THREE.Color(0xffddaa); // white glow
      // child.material.emissiveIntensity = 0.05;
      meshes.push(child);
    } 
  });


  return {name,planet,planet3d,orbit,meshes};
}