//script imports
import {createScene,createTextureLoader,createLighting} from './core/scene.js';
import { generateComposer,generateComposerPasses } from './core/effects.js';
import {preloadManyGLB} from './planets/modelCache.js';
import { createControls } from './core/controls.js';
import {handleResize} from './core/resize.js';
import {solarTransformDownZoomOut,
  sequentialReveal,
  planetChangeEventHandler,
  solarStartSunrise,
  sequentialHideUnselected} from './dynamics/animateSequences.js';
import {animate} from './dynamics/animate.js';
import {initSun} from './planets/sun.js';
import { initAllPlanets } from './planets/initPlanets.js';
import {MouseHandler} from './dynamics/mouse.js';

import { glbModelPaths } from './fixedValues/paths.js';

//util imports
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

// ****** Three js setup *******

const{scene,camera,renderer,canvas} = createScene();

const loadTexture = createTextureLoader();

const{pointLight,hemiLight,lightAmbient} = createLighting(renderer);

const composer = generateComposer(renderer);

const {outlinePass,bloomPass} = generateComposerPasses(scene,camera);

const {controls} = createControls(camera,renderer);

// ****** Lighting setup *******

scene.add(lightAmbient);
scene.add(hemiLight);

// ****** Sun setup *******

const sun = initSun(loadTexture);
sun.add(pointLight);
scene.add(sun);


// ****** POSTPROCESSING setup *******

//composer
composer.addPass(new RenderPass(scene,camera));
composer.addPass(outlinePass);
composer.addPass(bloomPass);


// ****** MOUSE setup *******

// ****** Animate EventListners *******

window.addEventListener('solarTransformDownZoomOutCue', (event) => {
  solarTransformDownZoomOut(sun);
}
, false);

window.addEventListener('solarStartSunrise', (event) => {
  solarStartSunrise(sun);
}, false);

window.addEventListener('firstReveal',()=>{
  sequentialReveal(1000,planets); 
});

// ****** Preload GLB models *******

await preloadManyGLB(Object.values(glbModelPaths));

// ****** Planets setup *******

const planets = await initAllPlanets(scene,loadTexture);
//include the sun at the start of raycastTargets
const raycastTargets = Object.values(planets).map(planet => planet.planet3d);
raycastTargets.unshift(sun);

//TODO: identify planet yet to be implemented!

// ****** core Animation *******

const mouse = new MouseHandler(camera,raycastTargets);
animate(mouse,outlinePass,camera, scene, planets,sun,raycastTargets,controls,composer);


// ****** EventListners *******
canvas.addEventListener('mousemove', (e)=> mouse.onMouseMove(e,raycastTargets), false);
canvas.addEventListener('mousedown', (e) =>mouse.onDocumentMouseDown(e), false);


canvas.addEventListener('beginSequentialHide', (event) => {
  sequentialHideUnselected(event.detail.selectedPlanet, planets);
});

window.addEventListener('resize', handleResize(camera,renderer));

window.addEventListener("planetChange", (event) => {
  planetChangeEventHandler(event,camera,offsets,indexOrderofPlanets);
});

//Add event listener when the DOM is ready for the sunrise!