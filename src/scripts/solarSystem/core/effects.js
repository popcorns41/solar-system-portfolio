import * as THREE from 'three';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export function generateComposer(){
    const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      format: THREE.RGBAFormat,  
      type: THREE.UnsignedByteType,
      depthBuffer: true,
      stencilBuffer: false
    });

    const composer = new EffectComposer(renderer, renderTarget);
    
    return composer;
}
export function generateComposerPasses(scene,camera){
    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.edgeStrength = 3;
    outlinePass.edgeGlow = 1;
    outlinePass.visibleEdgeColor.set(0xFFFFFF);
    outlinePass.hiddenEdgeColor.set(0x190a05);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.0001, 0.4, 0.001);
    bloomPass.renderToScreen = true;
    bloomPass.clear = false;
    bloomPass.threshold = 1;
    bloomPass.radius = 0.9;

    return {outlinePass,bloomPass};
}

