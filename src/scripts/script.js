import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';

import sunTexture from '/images/sun.jpg';
import poolBallTexture from '/images/8ball.jpg';
import basketballTexture from '/images/ball.jpg'
import mercuryTexture from '/images/mercurymap.jpg';
import mercuryBump from '/images/mercurybump.jpg';
import thaiFlagTexture from '/images/Flag_of_Thailand.jpg'

import earthTexture from '/images/earth_daymap.jpg';
import earthNightTexture from '/images/earth_nightmap.jpg';
import earthMoonTexture from '/images/moonmap.jpg';
import earthMoonBump from '/images/moonbump.jpg';
import marsTexture from '/images/marsmap.jpg';
import marsBump from '/images/marsbump.jpg';
import jupiterTexture from '/images/jupiter.jpg';
import ioTexture from '/images/jupiterIo.jpg';
import europaTexture from '/images/jupiterEuropa.jpg';
import ganymedeTexture from '/images/jupiterGanymede.jpg';
import callistoTexture from '/images/jupiterCallisto.jpg';
import saturnTexture from '/images/saturnmap.jpg';
import satRingTexture from '/images/saturn_ring.png';
import uranusTexture from '/images/uranus.jpg';
import uraRingTexture from '/images/uranus_ring.png';
import neptuneTexture from '/images/neptune.jpg';
import plutoTexture from '/images/plutomap.jpg';



// ******  SETUP  ******
console.log("Create the scene");
const scene = new THREE.Scene();

console.log("Create a perspective projection camera");
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(-175, 115, 5);

const canvas = document.getElementById('threeCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, preserveDrawingBuffer: true});

console.log("Create the renderer");

renderer.setClearColor(0x000000, 0); 
renderer.setSize(window.innerWidth, window.innerHeight);


console.log("Create an orbit control");
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.75;
controls.screenSpacePanning = false;

console.log("Set up texture loader");
const cubeTextureLoader = new THREE.CubeTextureLoader();
const loadTexture = new THREE.TextureLoader();

// ******  POSTPROCESSING setup ******
const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  format: THREE.RGBAFormat,  
  type: THREE.UnsignedByteType,
  encoding: THREE.sRGBEncoding,
  depthBuffer: true,
  stencilBuffer: false
});

const composer = new EffectComposer(renderer, renderTarget);
composer.addPass(new RenderPass(scene, camera));

// ******  OUTLINE PASS  ******
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 3;
outlinePass.edgeGlow = 1;
outlinePass.visibleEdgeColor.set(0xFFFFFF);
outlinePass.hiddenEdgeColor.set(0x190a05);
composer.addPass(outlinePass);

// ******  BLOOM PASS  ******
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.0001, 0.4, 0.001);
bloomPass.renderToScreen = true;
bloomPass.clear = false;
bloomPass.threshold = 1;
bloomPass.radius = 0.9;
//composer.addPass(bloomPass);

// ****** AMBIENT LIGHT ******
console.log("Add the ambient light");
var lightAmbient = new THREE.AmbientLight(0x222222, 6); 
scene.add(lightAmbient);

// ******  Star background  ******
/*
scene.background = cubeTextureLoader.load([

  bgTextureWood,
  bgTextureWood,
  bgTextureWood,
  bgTextureWood,
  bgTextureWood,
  bgTextureWood
]);
*/


//scene.background = color;

// ******  CONTROLS  ******
// const gui = new dat.GUI({ autoPlace: false });
// const customContainer = document.getElementById('gui-container');
// customContainer.appendChild(gui.domElement);

// ****** SETTINGS FOR INTERACTIVE CONTROLS  ******
const settings = {
  accelerationOrbit: 1,
  acceleration: 1,
  sunIntensity: 0
};

// gui.add(settings, 'accelerationOrbit', 0, 10).onChange(value => {
// });
// gui.add(settings, 'acceleration', 0, 10).onChange(value => {
// });
// gui.add(settings, 'sunIntensity', 1, 10).onChange(value => {
//   sunMat.emissiveIntensity = value;
// });

// mouse movement
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hasMouseMove = false;

function onMouseMove(event) {
    if (!hoverEnabled) return;

    hasMouseMove = true;
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(raycastTargets);

  const card = document.getElementById('hoverCard');

  if (intersects.length > 0) {
    const object = intersects[0].object;

    // Position the card near the cursor
    card.style.left = `${event.clientX + 10}px`;
    card.style.top = `${event.clientY + 10}px`;
    card.style.display = 'block';

    // Add name or info
    if (object === sun) {
      card.innerText = "Sun";
    } else if (object === mercury.planet) {
      card.innerText = "Mercury";
    } else if (object === venus.planet) {
      card.innerText = "Venus";
    } else if (object === earth.planet || object === earth.Atmosphere) {
      card.innerText = "Earth";
    } else if (object === mars.planet) {
      card.innerText = "Mars";
    } else if (object === jupiter.planet) {
      card.innerText = "Jupiter";
    } else if (object === saturn.planet) {
      card.innerText = "Saturn";
    } else {
      card.innerText = "";
      card.style.display = 'none';
    }

  } else {
    card.style.display = 'none';
  }

}

// ******  Globals  ******
let pendingPlanetSelection = null;
let isMovingTowardsPlanet = false;
let targetCameraPosition = new THREE.Vector3();
let hoverEnabled = true;
let offset;
let isHomeButtonView = false;

function sequentialHideUnselected(selectedPlanet, delay = 300) {
  for (let i = planets.length - 1; i >= 0; i--) {
    const planet3d = planets[i];
    const isSelected = planet3d === selectedPlanet.planet3d;

    setTimeout(() => {
      if (isSelected) {
        if (selectedPlanet.orbit && selectedPlanet.orbit.material) {
          const orbitMaterial = selectedPlanet.orbit.material;
          orbitMaterial.transparent = true;

          const duration = 1000;
          const startTime = performance.now();

          function fadeOrbit(currentTime) {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            const easedT = t * t * (3 - 2 * t);

            orbitMaterial.opacity = 1 - easedT;

            if (t < 1) {
              requestAnimationFrame(fadeOrbit);
            } else {
              selectedPlanet.orbit.visible = false;
            }
          }

          requestAnimationFrame(fadeOrbit);
        }
      } else {
        hidePlanet(planet3d);
      }
    }, (planets.length - 1 - i) * delay); // reverse order
  }
}

function getPlanetIndex(selectedPlanet) {
  if (selectedPlanet === sun) return 0;
  if (selectedPlanet === mercury) return 1;
  if (selectedPlanet === venus) return 2;
  if (selectedPlanet === earth) return 3;
  if (selectedPlanet === mars) return 4;
  if (selectedPlanet === jupiter) return 5;
  if (selectedPlanet === saturn) return 6;
  
  return -1; // Return -1 if the planet isn't found
}

function fadeSunOpacity(targetOpacity, duration = 1000) {
  if (!sunMat) return;

  sunMat.transparent = true;
  const startOpacity = sunMat.opacity;
  const startTime = performance.now();

  function fadeStep(currentTime) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);
    const easedT = t * t * (3 - 2 * t); // smoothstep easing

    sunMat.opacity = startOpacity + (targetOpacity - startOpacity) * easedT;

    if (t < 1) {
      requestAnimationFrame(fadeStep);
    }
  }

  requestAnimationFrame(fadeStep);
}

function onDocumentMouseDown(event) {
  event.preventDefault();

  isHomeButtonView = true;

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(raycastTargets);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const selectedPlanet = identifyPlanet(clickedObject);

    if (selectedPlanet) {
      window.planetIndex = getPlanetIndex(selectedPlanet);
      const indexAnnouncementEvent = new CustomEvent("solarSystemToInfoSection",
        {
          detail: {index: window.planetIndex}
        }
      )
      window.dispatchEvent(indexAnnouncementEvent);
      settings.accelerationOrbit = 0;

      const planetPosition = new THREE.Vector3();

      if (selectedPlanet === sun) {
        pendingPlanetSelection = sun;
      } else {
        fadeSunOpacity(0,1000);
        pendingPlanetSelection = selectedPlanet;
        selectedPlanet.planet.getWorldPosition(planetPosition);
      }

      window.dispatchEvent(new CustomEvent("circularBorder"));
      
      isMovingTowardsPlanet = true;
      controls.target.copy(planetPosition);
      camera.lookAt(planetPosition);
      targetCameraPosition.copy(planetPosition).add(
        camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset)
      );
      // Wait for sequential hide to complete before moving camera
      sequentialHideUnselected(pendingPlanetSelection);
      setTimeout(()=>{
         window.dispatchEvent(new CustomEvent("beginPlanetTransform"));
      },1000)

       
      

 

      hoverEnabled = false;
      hasMouseMove = false;
      document.getElementById('hoverCard').style.display = 'none';
      outlinePass.selectedObjects = [];
      



      // scrollToPlanetSection(selectedPlanet.name || selectedPlanet); // assume .name or string
      // window.state.fadeBackground = true;
      // window.dispatchEvent(new CustomEvent("fadeToBlack", {
      //   detail: { key: "fadeBackground", value: true }
      // }));
    }
  }
}

function identifyPlanet(clickedObject) {
  // Logic to identify which planet was clicked based on the clicked object, different offset for camera distance
        if (clickedObject.material === mercury.planet.material) {
          offset = offsets[1];
          return mercury;
        } else if (clickedObject.material === sunMat){
          offset = offsets[0];
          return sun;
        } else if (clickedObject.material === venus.planet.material) {
          offset = offsets[2];
          return venus;
        } else if (clickedObject.material === earth.planet.material) {
          offset = offsets[3];
          return earth;
        } else if (clickedObject.material === mars.planet.material) {
          offset = offsets[4];
          return mars;
        } else if (clickedObject.material === jupiter.planet.material) {
          offset = offsets[5];
          return jupiter;
        } else if (clickedObject.material === saturn.planet.material) {
          offset = offsets[6];
          return saturn;
        } 
  return null;
}


// ******  SHOW PLANET INFO AFTER SELECTION  ******

function scrollToPlanetSection(planetName) {
  const id = planetName.toLowerCase() + "-section"; // e.g., "earth-section"
  const target = document.getElementById(id);

  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  } else{
    console.log("planet not found! :(")
  }
}

let isZoomingOut = false;
let zoomOutTargetPosition = new THREE.Vector3(-175, 115, 5);


// ******  SUN  ******


const sunName = "Sun"
let sunMat;

const sunSize = 697/40; // 40 times smaller scale than earth
const sunGeom = new THREE.SphereGeometry(sunSize, 32, 20);
sunMat = new THREE.MeshStandardMaterial({
  emissive: 0xFFF88F,
  emissiveMap: loadTexture.load(sunTexture),
  emissiveIntensity: 1.2
});

sunMat.transparent = true;

const sun = new THREE.Mesh(sunGeom, sunMat);

scene.add(sun);

//point light in the sun
const pointLight = new THREE.PointLight(0xFDFFD3 , 1200, 400, 1.4);
sun.add(pointLight);

// Gentle ambient


// Soft hemispheric fill
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 0.9);
scene.add(hemiLight);




// ******  PLANET CREATION FUNCTION  ******
function createPlanet(planetName, size, position, tilt, texture, bump, ring, atmosphere, moons){

  let material;
  if (texture instanceof THREE.Material){
    material = texture;
  } 
  else if(bump){
    material = new THREE.MeshPhongMaterial({
    map: loadTexture.load(texture),
    bumpMap: loadTexture.load(bump),
    bumpScale: 0.7
    });
  }
  else {
    material = new THREE.MeshPhongMaterial({
    map: loadTexture.load(texture)
    });
  } 

  const name = planetName;
  const geometry = new THREE.SphereGeometry(size, 32, 20);
  const planet = new THREE.Mesh(geometry, material);
  const planet3d = new THREE.Object3D;
  const planetSystem = new THREE.Group();
  planetSystem.add(planet);
  let Atmosphere;
  let Ring;
  planet.position.x = position;
  planet.rotation.z = tilt * Math.PI / 180;

  // add orbit path
  const orbitPath = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    position, position, // xRadius, yRadius
    0, 2 * Math.PI,   // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
);

  const pathPoints = orbitPath.getPoints(100);
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints);
  const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.5 });
  const orbit = new THREE.LineLoop(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2;
  planet.orbit = orbit;
  planetSystem.add(orbit);

  //add ring
  if(ring)
  {
    const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius,30);
    const RingMat = new THREE.MeshStandardMaterial({
      map: loadTexture.load(ring.texture),
      side: THREE.DoubleSide
    });
    Ring = new THREE.Mesh(RingGeo, RingMat);
    planetSystem.add(Ring);
    Ring.position.x = position;
    Ring.rotation.x = -0.5 *Math.PI;
    Ring.rotation.y = -tilt * Math.PI / 180;
  }
  
  //add atmosphere
  if(atmosphere){
    const atmosphereGeom = new THREE.SphereGeometry(size+0.1, 32, 20);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      map:loadTexture.load(atmosphere),
      transparent: true,
      opacity: 0.4,
      depthTest: true,
      depthWrite: false
    })
    Atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMaterial)
    
    Atmosphere.rotation.z = 0.41;
    planet.add(Atmosphere);
  }

  //add moons
  if(moons){
    moons.forEach(moon => {
      let moonMaterial;
      
      if(moon.bump){
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture),
          bumpMap: loadTexture.load(moon.bump),
          bumpScale: 0.5
        });
      } else{
        moonMaterial = new THREE.MeshStandardMaterial({
          map: loadTexture.load(moon.texture)
        });
      }
      const moonGeometry = new THREE.SphereGeometry(moon.size, 32, 20);
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      const moonOrbitDistance = size * 1.5;
      moonMesh.position.set(moonOrbitDistance, 0, 0);
      planetSystem.add(moonMesh);
      moon.mesh = moonMesh;
    });
  }
  //add planet system to planet3d object and to the scene
  planet3d.add(planetSystem);
  scene.add(planet3d);
  return {name, planet, planet3d, Atmosphere, moons, planetSystem, Ring, orbit};
}


// ******  LOADING OBJECTS METHOD  ******
function loadObject(path, position, scale, callback) {
  const loader = new GLTFLoader();

  loader.load(path, function (gltf) {
      const obj = gltf.scene;
      obj.position.set(position, 0, 0);
      obj.scale.set(scale, scale, scale);
      scene.add(obj);
      if (callback) {
        callback(obj);
      }
  }, undefined, function (error) {
      console.error('An error happened', error);
  });
}

// Earth day/night effect shader material
// const earthMaterial = new THREE.ShaderMaterial({
//   uniforms: {
//     dayTexture: { type: "t", value: loadTexture.load(earthTexture) },
//     nightTexture: { type: "t", value: loadTexture.load(earthNightTexture) },
//     sunPosition: { type: "v3", value: sun.position }
//   },
//   vertexShader: `
//     varying vec3 vNormal;
//     varying vec2 vUv;
//     varying vec3 vSunDirection;

//     uniform vec3 sunPosition;

//     void main() {
//       vUv = uv;
//       vec4 worldPosition = modelMatrix * vec4(position, 1.0);
//       vNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
//       vSunDirection = normalize(sunPosition - worldPosition.xyz);
//       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `,
//   fragmentShader: `
//     uniform sampler2D dayTexture;
//     uniform sampler2D nightTexture;

//     varying vec3 vNormal;
//     varying vec2 vUv;
//     varying vec3 vSunDirection;

//     void main() {
//       float intensity = max(dot(vNormal, vSunDirection), 0.0);
//       vec4 dayColor = texture2D(dayTexture, vUv);
//       vec4 nightColor = texture2D(nightTexture, vUv)* 0.2;
//       gl_FragColor = mix(nightColor, dayColor, intensity);
//     }
//   `
// });


// ******  MOONS  ******


// ******  PLANET CREATIONS  ******
//mercury original size: 2.4
const mercury = new createPlanet('Mercury', 5, 40, 0, mercuryTexture, mercuryBump);
const venus = new createPlanet('Venus', 6.1, 65, 0, basketballTexture);
const earth = new createPlanet('Earth', 6.4, 90, 0, earthTexture, null, null);
const mars = new createPlanet('Mars', 7, 115, 0, thaiFlagTexture, marsBump)
// Load Mars moons


const jupiter = new createPlanet('Jupiter', 69/4, 170, 0, poolBallTexture, null, null, null);
const saturn = new createPlanet('Saturn', 58/4, 240, 0, saturnTexture, null,null);


const indexOrderofPlanets = [
  { name: "Sun", mesh: sun },
  { name: "Mercury", mesh: mercury.planet },
  { name: "Venus", mesh: venus.planet },
  { name: "Earth", mesh: earth.planet },
  { name: "Mars", mesh: mars.planet },
  { name: "Jupiter", mesh: jupiter.planet },
  { name: "Saturn", mesh: saturn.planet }
];

const offsets = [
  70,    // sun
  20,  // mercury
  25,  // venus
  25,    // earth
  30,    // mars
  65,    // jupiter
  50     // saturn
];

// Array of planets and atmospheres for raycasting
const raycastTargets = [
  sun, mercury.planet, venus.planet, earth.planet, 
  mars.planet, jupiter.planet, saturn.planet
];

// ******  SHADOWS  ******
renderer.shadowMap.enabled = true;

//properties for the point light
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 10;
pointLight.shadow.camera.far = 20;


//casting and receiving shadows
earth.planet.castShadow = true;
earth.planet.receiveShadow = true;

mercury.planet.castShadow = true;
mercury.planet.receiveShadow = true;
venus.planet.castShadow = true;
venus.planet.receiveShadow = true;
mars.planet.castShadow = true;
mars.planet.receiveShadow = true;
jupiter.planet.castShadow = true;
jupiter.planet.receiveShadow = true;

saturn.planet.castShadow = true;
saturn.planet.receiveShadow = true;



const planets = [
  mercury.planet3d,
  venus.planet3d,
  earth.planet3d,
  mars.planet3d,
  jupiter.planet3d,
  saturn.planet3d
];

planets.forEach((planet, index) => {
planet.visible = false; // Initially hide them all
});

function revealPlanet(planetGroup) {
  planetGroup.visible = true;

  planetGroup.traverse(child => {
    if ((child.isMesh || child.isLine) && child.material) {
      child.visible = true; // Ensure child is renderable
      child.material.transparent = true;
      child.material.opacity = 0;

      const duration = 1000;
      const startTime = performance.now();

      function fade(currentTime) {
        const elapsed = currentTime - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = t * t * (3 - 2 * t); // smoothstep easing

        child.material.opacity = easedT;

        if (t < 1) {
          requestAnimationFrame(fade);
        }
      }

      requestAnimationFrame(fade);
    }
  });
}

function hidePlanet(planetGroup) {
  return new Promise((resolve) => {
    planetGroup.traverse(child => {
      if (child.isMesh || child.isLine) {
        child.material.transparent = true;

        const duration = 200;
        const startTime = performance.now();

        function fade(currentTime) {
          const elapsed = currentTime - startTime;
          const t = Math.min(elapsed / duration, 1);
          const easedT = 1 - (t * t * (3 - 2 * t)); // smoothstep fade-out

          child.material.opacity = easedT;

          if (t < 1) {
            requestAnimationFrame(fade);
          } else {
            child.visible = false;
            resolve(); 
          }
        }

        requestAnimationFrame(fade);
      }
    });
  });
}

function sequentialReveal(delay = 1000) {
  planets.forEach((planet, index) => {
    setTimeout(() => {
      revealPlanet(planet);

      // After the last planet, fire the event
      if (index === planets.length - 1) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("planetsInView"));
          hoverEnabled = true;
        }, delay); // wait for the final reveal animation
      }

    }, index * delay);
  });
}
sun.scale.set(1.7, 1.7, 1.7);
//initial y: -50
//target y: 40
sun.position.y=-50;
sun.position.z=0;
sun.position.x=0;

function solarStartSunrise() {
  const startY = sun.position.y;
  const targetY = 40;
  const duration = 8000;
  const startTime = performance.now();

  function rise(currentTime) {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);

    // Eased movement (cubic ease-out)
    const easedT = 1 - Math.pow(1 - t, 2);
    
    sun.position.y = startY + (targetY - startY) * easedT;

    if (t < 1) {
      requestAnimationFrame(rise);
    }else{
      window.dispatchEvent(new CustomEvent("sunRose"));
    }
  }

  requestAnimationFrame(rise);
}

function solarTransformDownZoomOut() {
  const startY = sun.position.y;
  const targetY = 0;

  const startScale = sun.scale.x; // assumed uniform scale
  const targetScale = 1;

  const duration = 3000; // ms
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    const easedT = t * t * (3 - 2 * t); // smoothstep easing

    // Position
    sun.position.y = startY + (targetY - startY) * easedT;

    // Scale
    const scale = startScale + (targetScale - startScale) * easedT;
    sun.scale.set(scale, scale, scale);

    if (t < 1) {
      requestAnimationFrame(animate);
    }else{
      window.dispatchEvent(new CustomEvent("sunZoomComplete"));
    }
  }

  requestAnimationFrame(animate);
}
   
function animate(){

  //rotating planets around the sun and itself
  sun.rotateY(0.001);
  


    mercury.planet.rotateY(0.001 * settings.acceleration);
    mercury.planet3d.rotateY(0.004 * settings.accelerationOrbit);
    venus.planet.rotateY(0.005 * settings.acceleration);
    venus.planet3d.rotateY(0.0006 * settings.accelerationOrbit);
    earth.planet.rotateY(0.005 * settings.acceleration);
    earth.planet3d.rotateY(0.001 * settings.accelerationOrbit);
    mars.planet.rotateY(0.001 * settings.acceleration);
    mars.planet3d.rotateY(0.0015 * settings.accelerationOrbit);
    jupiter.planet.rotateY(0.005 * settings.acceleration);
    jupiter.planet3d.rotateY(0.0003 * settings.accelerationOrbit);
    saturn.planet.rotateY(0.01 * settings.acceleration);
    saturn.planet3d.rotateY(0.0002 * settings.accelerationOrbit);



// Rotate asteroids
/*
asteroids.forEach(asteroid => {
  asteroid.rotation.y += 0.0001;
  asteroid.position.x = asteroid.position.x * Math.cos(0.0001 * settings.accelerationOrbit) + asteroid.position.z * Math.sin(0.0001 * settings.accelerationOrbit);
  asteroid.position.z = asteroid.position.z * Math.cos(0.0001 * settings.accelerationOrbit) - asteroid.position.x * Math.sin(0.0001 * settings.accelerationOrbit);
});
*/

// ****** OUTLINES ON PLANETS ******

if (hasMouseMove){
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections
  var intersects = raycaster.intersectObjects(raycastTargets);

  // Reset all outlines
  outlinePass.selectedObjects = [];

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;

    // If the intersected object is an atmosphere, find the corresponding planet
    if (intersectedObject === earth) {
      outlinePass.selectedObjects = [earth.planet];
    } else if (intersectedObject === venus.Atmosphere) {
      outlinePass.selectedObjects = [venus.planet];
    } else {
      // For other planets, outline the intersected object itself
      outlinePass.selectedObjects = [intersectedObject];
    }
  }
}

// ******  ZOOM IN/OUT  ******
if (isMovingTowardsPlanet) {
  camera.position.lerp(targetCameraPosition, 0.03);
  if (camera.position.distanceTo(targetCameraPosition) < 1) {
    isMovingTowardsPlanet = false;

    if (pendingPlanetSelection) {
      pendingPlanetSelection = null;
    }
  }
} else if (isZoomingOut) {
  camera.position.lerp(zoomOutTargetPosition, 0.03);

  if (camera.position.distanceTo(zoomOutTargetPosition) < 1) {
      isZoomingOut = false;
  }
}

  controls.update();
  requestAnimationFrame(animate);
  composer.render();
}

animate();

window.solarStartSunrise = solarStartSunrise;
window.sequentialReveal = sequentialReveal;
window.solarTransformDownZoomOut = solarTransformDownZoomOut;

window.addEventListener('zoomOutNeeded', async () => {
  isHomeButtonView = false;
  isZoomingOut = true;
  console.log("zoom out received!");
  fadeSunOpacity(1,2000);
  settings.accelerationOrbit = 1;

  setTimeout(() => {
    sequentialReveal();
  }, 500); // optional pause
});

// function hideUnselectedPlanets(selectedIndex) {
//   planets.forEach
// }

function hideAllExceptSelected(selectedIndex) {
  indexOrderofPlanets.forEach((planetObj, index) => {
    const mesh = planetObj.mesh;

    if (!mesh) return;

    const isSun = planetObj.name === "Sun";

    if (index !== selectedIndex) {
      if (isSun) {
        sunMat.opacity = 0; // Special handling for Sun
      } else {
        mesh.visible = false;
      }

      if (planetObj.orbit) {
        planetObj.orbit.visible = false;
      }
    } else {
      if (isSun) {
        sunMat.opacity = 1; // Reveal the Sun
      } else {
        mesh.visible = true;
      }

      if (planetObj.orbit) {
        planetObj.orbit.visible = true;
      }
    }
  });
}

window.addEventListener("planetChange", (event) => {
  const index = event.detail.index;
  const selected = indexOrderofPlanets[index];
  const offset = offsets[index];

  hideAllExceptSelected(index);

  selected.mesh.visible = true;
  selected.mesh.traverse(child => {
  if (child.material) {
    child.material.transparent = true;
    child.material.opacity = 1;
  }
});
  const planetPosition = new THREE.Vector3();
  selected.mesh.getWorldPosition(planetPosition);

  // Update camera target and position

  controls.target.copy(planetPosition);
  camera.lookAt(planetPosition);
  targetCameraPosition.copy(planetPosition).add(
    camera.position.clone().sub(planetPosition).normalize().multiplyScalar(offset)
  );
  
  camera.position.copy(targetCameraPosition);
  
  console.log(`Camera updated to: ${selected.name}`);
});

canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onDocumentMouseDown, false);
canvas.addEventListener('resize', function(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  composer.setSize(window.innerWidth,window.innerHeight);
});

window.addEventListener('resize', () => {
  const canvas = document.getElementById('threeCanvas');

  if (isHomeButtonView) {
    const scale = 200 / window.innerWidth;
    const translateY = window.innerHeight / 2 - 100;
    canvas.style.transform = `translate(0px, ${translateY}px) scale(${scale})`;
  } else {
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.transform = ''; // Reset to normal
  }
});
