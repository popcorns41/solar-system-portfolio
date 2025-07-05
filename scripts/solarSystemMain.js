//script imports
import {initSetup,postProcessSetup,lightingSetup,initPlanetsToScene} from '/scripts/solarSystem/core/initCanvasSetup.js';
import {initSun,initPlanetObjects,bootupPlanetConditions,rePositionSun} from '/scripts/solarSystem/objects/initPlanetObjects.js';
import {MouseHandler} from '/scripts/solarSystem/input/mouse.js';
import { initEventListeners } from './solarSystem/input/eventListeners.js';
import {offsets} from '/scripts/solarSystem/core/const.js';
import {animate} from '/scripts/solarSystem/animation/animate.js'

export async function initSolarSystem(isDev){
  // ******  SETUP  ******
  const { scene, camera, renderer, controls, canvas } = initSetup();
  const { composer,outlinePass,fxaaPass } = postProcessSetup(renderer, scene, camera);
  lightingSetup(scene);

  // ******  SUN  ******
  const sun = initSun();


  const planets = await initPlanetObjects();

  initPlanetsToScene(scene,sun,planets);
  if (!(isDev)){
    rePositionSun(sun);
    bootupPlanetConditions(planets);
  }
     // mouse movement
  const mouseHandler = new MouseHandler({sun,planets,camera,controls,outlinePass,offsets,canvas});

  //attach click events to canvas
  mouseHandler.attach(); 
  
  animate(sun,planets,mouseHandler,outlinePass,camera,controls,composer);
  initEventListeners({canvas, renderer, camera, fxaaPass,sun,planets,controls,composer});
}



  


 