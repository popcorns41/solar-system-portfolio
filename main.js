// src/main.js

import './scripts/boot.js';
import './scripts/browsing.js';
import './scripts/dynamicInfoBox.js';
import './modelLoader/loadingHandler.js';
import './scripts/uiDynamics.js'


const params = new URLSearchParams(window.location.search);
const isDevMode = params.has('dev');

window.addEventListener("modelLoaded", async () => {
  console.log("dev mode?", isDevMode);
  const {initSolarSystem} = await import('/scripts/solarSystemMain.js');
  initSolarSystem(isDevMode);
  window.dispatchEvent(new CustomEvent('solarSystemReady'));
});




