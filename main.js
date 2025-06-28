// src/main.js

import './scripts/boot.js';
import './scripts/browsing.js';
import './scripts/dom_overlay.js';
import './scripts/dynamicInfoBox.js';
import './scripts/navigationButtons.js';
import './modelLoader/loadingHandler.js';


const params = new URLSearchParams(window.location.search);
const isDevMode = params.has('dev');

window.addEventListener("modelLoaded", async () => {
  console.log("dev mode?", isDevMode);

  if (isDevMode) {
    console.log('Models loaded, initializing dev solar system...');
    const { initDevSolarSystem } = await import('/scripts/solarSystemMain.js');
    initDevSolarSystem();
  } else {
    console.log('Models loaded, initializing solar system...');
    // const { initSolarSystem } = await import('/scripts/solarSystemMain.js');
    // initSolarSystem();
    const { initHomepageSolarSystem } = await import('/scripts/solarSystemMain.js');
    initHomepageSolarSystem();
  }

  window.dispatchEvent(new CustomEvent('solarSystemReady'));
});




