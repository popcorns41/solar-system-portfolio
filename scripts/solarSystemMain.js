//script imports
import {initSetup,postProcessSetup,lightingSetup,initPlanetsToScene} from '/scripts/solarSystem/initCanvasSetup.js';
import {initSun,initPlanetObjects} from '/scripts/solarSystem/initPlanetObjects.js';
import {MouseHandler} from '/scripts/solarSystem/mouse.js';
import { initEventListeners } from './solarSystem/eventListeners.js';
import {offsets} from '/scripts/solarSystem/const.js';
import {animate} from '/scripts/solarSystem/animate.js'

export async function initSolarSystem() {
  // ******  SETUP  ******
  const { scene, camera, renderer, controls, canvas } = initSetup();
  const { composer,outlinePass,fxaaPass } = postProcessSetup(renderer, scene, camera);
  lightingSetup(scene);

  // ******  SUN  ******
  const { sun, sunMat } = initSun();
  const planets = await initPlanetObjects();

  initPlanetsToScene(scene,sun,planets);

     // mouse movement
  const mouseHandler = new MouseHandler({sun,sunMat,planets,camera,controls,outlinePass,offsets,canvas});

  //attach click events to canvas
  mouseHandler.attach(); 
  
  animate(sun,planets,mouseHandler,outlinePass,camera,controls,composer);
  initEventListeners({canvas, renderer, camera, fxaaPass,sunMat,sun,planets})
}
  



  


 