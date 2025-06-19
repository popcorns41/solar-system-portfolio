import * as THREE from 'three';

export function createScene() {
  console.log('[Scene] Initialising scene, camera, and renderer...');

  // Create scene
  const scene = new THREE.Scene();

  // Set up camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(-175, 115, 5);

  // Get canvas and create renderer
  const canvas = document.getElementById('threeCanvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    preserveDrawingBuffer: true,
    antialias: true
  });

  renderer.setClearColor(0x000000, 0); // Transparent background
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Optional: enable shadow maps if you're using lights/shadows
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Resize listener
  return { scene, camera, renderer, canvas };
}

export function createLighting(){
    //point light in the sun
    const pointLight = new THREE.PointLight(0xFDFFD3 , 1200, 400, 1.4);

    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 10;
    pointLight.shadow.camera.far = 20;

    //soft hemisphere lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.2);

    //Ambient lighting
    const lightAmbient = new THREE.AmbientLight(0x222222, 6); 

    return {pointLight,hemiLight,lightAmbient};

}

export function createTextureLoader() {
  const loadTexture = new THREE.TextureLoader();
  return loadTexture;
}
