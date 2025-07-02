import {planetChange,handleZoomOut,handleResize} from '/scripts/solarSystem/input/eventHandler.js';
import {sequentialHideUnselected, sequentialReveal, solarStartSunrise,solarTransformDownZoomOut,fadeSunOpacity} from '/scripts/solarSystem/animation/sequenceAnim.js';
import {state,settings} from '/scripts/solarSystem/core/state.js';
import { offsets } from '/scripts/solarSystem/core/const.js';

export function initEventListeners({canvas, renderer, camera, fxaaPass,sun,planets,controls,composer}){
    canvas.addEventListener('changeSunOpacity',(e) =>fadeSunOpacity(sun.material,e.detail.opacity,e.detail.duration));
    canvas.addEventListener('hideOutofViewPlanets',(e)=>sequentialHideUnselected(e.detail.selectedPlanet,planets,e.detail.delay));

    window.addEventListener('zoomOutNeeded',()=>{ 
    handleZoomOut(canvas,settings);
    });

    window.addEventListener('beginSunrise', () => {
    solarStartSunrise(sun);
    });

    window.addEventListener('solarTransformDownZoomOutCue', () => {solarTransformDownZoomOut(sun);});
    window.addEventListener('revealPlanets', (e) => {sequentialReveal(planets, state.hoverEnabled, e.detail.delay);});
    window.addEventListener('resize', handleResize({canvas,renderer,camera,fxaaPass,composer}));
    window.addEventListener("planetChange", (event) => {
    planetChange({event,sun,planets,controls,camera,offsets,canvas});
    });

    const observer = new ResizeObserver(() => {
        console.log('Element resized!');
        // Your resize logic (camera.aspect, renderer.setSize, etc.)
        handleResize({canvas,renderer,camera,fxaaPass,composer});
    });

    observer.observe(document.getElementById('threeCanvas'));
}