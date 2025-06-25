// src/main.js

import './scripts/boot.js';
import './scripts/browsing.js';
import './scripts/dom_overlay.js';
import './scripts/dynamicInfoBox.js';
import './scripts/globals.js';
import './scripts/navigationButtons.js';
import './model_loader/loadingHandler.js';
window.addEventListener('modelLoaded', async (e) => {
    console.log('Models loaded, initializing solar system...');
  const { initSolarSystem } = await import('/scripts/solarSystemMain.js');
  initSolarSystem(e.detail.modelCache);
  window.dispatchEvent(new CustomEvent('solarSystemReady'));
});


