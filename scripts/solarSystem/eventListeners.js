import {planetChange,handleZoomOut,handleResize} from '/scripts/solarSystem/eventHandler.js';
import {sequentialHideUnselected, sequentialReveal, solarStartSunrise,solarTransformDownZoomOut,fadeSunOpacity} from '/scripts/solarSystem/sequenceAnim.js';
import {state,settings} from '/scripts/solarSystem/state.js';

export function initEventListeners({canvas, renderer, camera, fxaaPass,sunMat,sun,planets}){
    canvas.addEventListener('changeSunOpacity',(e) =>fadeSunOpacity(sunMat,e.detail.opacity,e.detail.duration));
    canvas.addEventListener('hideOutofViewPlanets',(e)=>sequentialHideUnselected(e.detail.selectedPlanet,planets));

    window.addEventListener('zoomOutNeeded',()=>{ 
    handleZoomOut(canvas,settings);
    });

    window.addEventListener('beginSunrise', () => {
    solarStartSunrise(sun);
    });

    window.addEventListener('solarTransformDownZoomOutCue', () => {solarTransformDownZoomOut(sun);});
    window.addEventListener('revealPlanets', (e) => {sequentialReveal(planets, state.hoverEnabled, e.detail.delay);});
    window.addEventListener('resize', handleResize(renderer,camera,fxaaPass));
    window.addEventListener("planetChange", (event) => {
    planetChange(event,planets,controls,camera,offsets);
    });
}