//script imports
import {createScene,createLighting} from './core/scene.js';
import { generateComposer,generateComposerPasses } from './core/effects.js';
import {preloadManyGLB} from './planets/glbLoader/modelCache.js';
import { createControls } from './core/controls.js';
import {createRaycaster,onMouseMove,onDocumentMouseDown } from './dynamics/mouse.js';
import {handleResize} from './core/resize.js';
import {solarTransformDownZoomOut,planetChangeEventHandler,solarStartSunrise} from './dynamics/animateSequences.js';
import {animate} from './dynamics/animate.js';
import {initSun} from './planets/sun.js';
import { initglbPlanets } from './planets/initPlanets.js';

import { glbModelPaths } from './fixedValues/paths.js';

//util imports
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

// ****** Three js setup *******

const{scene,camera,renderer,canvas} = createScene();

const{pointLight,hemiLight,lightAmbient} = createLighting();

const composer = generateComposer();

const {outlinePass,bloomPass} = generateComposerPasses(scene,camera);

const {controls} = createControls(camera);

// ****** Lighting setup *******

scene.add(lightAmbient);
scene.add(hemiLight);

// ****** Sun setup *******

const sun = initSun(scene,pointLight);
sun.add(pointLight);
scene.add(sun);


// ****** POSTPROCESSING setup *******

//composer
composer.addPass(new RenderPass(scene,camera));
composer.addPass(outlinePass);
composer.addPass(bloomPass);


// ****** MOUSE setup *******

const raycaster = createRaycaster();

// ****** Animate EventListners *******

window.addEventListener('solarTransformDownZoomOut', (event) => {
  solarTransformDownZoomOut(sun);
}
, false);
window.addEventListener('solarStartSunrise', (event) => {
  solarStartSunrise(sun);
}, false);
// ****** Preload GLB models *******

await preloadManyGLB(Object.values(glbModelPaths));

// ****** Planets setup *******

const planets = await initglbPlanets(scene);
//include the sun at the start of raycastTargets
const raycastTargets = Object.values(planets).map(planet => planet.planet3d);
raycastTargets.unshift(sun);
const animateTargets = Object.values(planets).map(planet => planet);
animateTargets.unshift(sun);

//TODO: identify planet yet to be implemented!

// ****** core Animation *******

animate(outlinePass,camera, scene, animateTargets, raycaster, raycastTargets,controls,composer);


// ****** EventListners *******
canvas.addEventListener('mousemove', (e)=> onMouseMove(e,raycaster,camera,raycastTargets), false);
canvas.addEventListener('mousedown', (e) =>onDocumentMouseDown(e,raycaster,camera,raycastTargets), false);

window.addEventListener('resize', handleResize(camera,renderer));

window.addEventListener("planetChange", (event) => {
  planetChangeEventHandler(event,camera,offsets,indexOrderofPlanets);
});

//Add event listener when the DOM is ready for the sunrise!