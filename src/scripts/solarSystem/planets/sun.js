import sunTexture from '/images/sun.jpg';
import * as THREE from 'three';
import {texturePaths} from '../fixedValues/paths.js';

export function initSun(loadTexture){
    const sunSize = 697/40; // 40 times smaller scale than earth
    const sunGeom = new THREE.SphereGeometry(sunSize, 32, 20);
    let sunMat;

    sunMat = new THREE.MeshStandardMaterial({
    emissive: 0xFFF88F,
    emissiveMap: loadTexture.load(texturePaths.sunTexture),
    emissiveIntensity: 1,
    color: new THREE.Color(0xFFA500)
    });

    sunMat.transparent = true;

    const sun = new THREE.Mesh(sunGeom, sunMat);

    // ****** initialization for sunrise *******
    sun.scale.set(1.7, 1.7, 1.7);
    //initial y: -50
    //target y: 40
    sun.position.y=-50;
    sun.position.z=0;
    sun.position.x=0;
   
    return sun;
}