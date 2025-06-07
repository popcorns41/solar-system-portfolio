window.fadeToBlack = function(duration = 1000) {
  const overlay = document.getElementById('fade-overlay');
  overlay.style.transition = `opacity ${duration}ms ease`;
  overlay.style.opacity = '1';
};

window.fadeFromBlack = function(duration = 1000) {
  const overlay = document.getElementById('fade-overlay');
  overlay.style.transition = `opacity ${duration}ms ease`;
  overlay.style.opacity = '0';
};

window.state = {
    fadeBackground: false,
    planetTilt: 0,
    selectedPlanet: null,       // e.g. "Mercury"
    //planetRotation: new THREE.Euler(), // rotation state
    cameraMode: 'orbiting',     // or 'zoomedIn'
    currentSection: null        // for DOM scroll sync
};

var isDefined = false;

if (window.state){
    isDefined = true;
}

console.log("Is window.state defined?", isDefined);