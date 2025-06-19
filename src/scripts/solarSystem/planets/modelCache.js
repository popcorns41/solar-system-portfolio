import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const cache = new Map();



export async function loadGLB(path, scene = null) {
  if (cache.has(path)) {
    // Clone the model so each instance is independent
    const cached = cache.get(path).clone(true);
    if (scene) scene.add(cached);
    return cached;
  }

  const gltf = await new Promise((resolve, reject) => {
    loader.load(path, resolve, undefined, reject);
  });

  const model = gltf.scene;
  cache.set(path, model); // Store original (uncloned)
  const instance = model.clone(true);
  if (scene) scene.add(instance);
  return instance;
}

export async function preloadGLB(path) {
  if (cache.has(path)) return;

  try {
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        path,
        resolve,
        undefined,
        (error) => {
          console.error(`❌ Failed to load GLB: ${path}`);
          reject(error);
        }
      );
    });

    cache.set(path, gltf.scene);
  } catch (error) {
    console.error(`🚨 Error while preloading ${path}:`, error);
  }
}

export async function preloadManyGLB(paths = []) {
  await Promise.all(paths.map(preloadGLB));
}