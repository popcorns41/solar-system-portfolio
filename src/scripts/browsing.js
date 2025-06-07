function transformCanvasToHomeButton() {
  const canvas = document.getElementById("threeCanvas");
  const card = document.getElementById("tutorialCard");

  canvas.style.pointerEvents = "none";

  card.style.display = "none";

  // First: scale and round the canvas
  const scale = 200 / window.innerWidth; // target width is 150px
  canvas.style.transition = "transform 10s ease, border-radius 10s ease";
  canvas.style.transform = `scale(${scale})`;
  canvas.style.borderRadius = "50%";
  canvas.style.pointerEvents = "none";

  window.addEventListener("beginPlanetTransform",()=>{
    // Total vertical movement (relative to center of original canvas)
    const translateY = window.innerHeight / 2 - 100;

    // New transform: scale + move
    canvas.style.transition = "transform 4s ease";
    canvas.style.transform = `translate(0px, ${translateY}px) scale(${scale})`;
  });
}

function transformCanvasToSolarSystem() {
  const canvas = document.getElementById("threeCanvas");

  canvas.style.transition = "transform 4s ease, border-radius 4s ease";
  canvas.style.transform = "translate(0, 0) scale(1)";
  canvas.style.borderRadius = "0%";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "auto";
  setTimeout(()=>{window.dispatchEvent(new CustomEvent("zoomOutNeeded"));},0);
  
}


function showPlanetSelector() {
  const selector = document.getElementById("planetSelector");
  selector.style.opacity = "1";
  selector.style.pointerEvents = "auto";
}

let lastIndex = null; // Track previous index

function updateArrows() {
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  const index = window.planetIndex;

  // Only animate if index has changed
  if (index !== lastIndex) {
    // Remove previous animation classes
    leftArrow.classList.remove("sweep-left");
    rightArrow.classList.remove("sweep-right");

    // LEFT arrow
    if (index === 6) {
      // Hide left, show right
      leftArrow.style.opacity = "0";
      leftArrow.style.pointerEvents = "none";
      rightArrow.style.opacity = "1";
      rightArrow.style.pointerEvents = "auto";

      // Add right sweep animation only if becoming visible
      if (lastIndex !== 1) {
        rightArrow.classList.add("sweep-right");
      }

    } else if (index === 0) {
      // Hide right, show left
      rightArrow.style.opacity = "0";
      rightArrow.style.pointerEvents = "none";
      leftArrow.style.opacity = "1";
      leftArrow.style.pointerEvents = "auto";

      if (lastIndex !== 5) {
        leftArrow.classList.add("sweep-left");
      }

    } else {
      // Both visible
      leftArrow.style.opacity = "1";
      leftArrow.style.pointerEvents = "auto";
      rightArrow.style.opacity = "1";
      rightArrow.style.pointerEvents = "auto";

      // Only re-add if coming from either edge
      if (lastIndex === 0) {
        leftArrow.classList.add("sweep-left");
      }
      if (lastIndex === 6) {
        rightArrow.classList.add("sweep-right");
      }
    }

    lastIndex = index; // Update tracker
  }
}

document.getElementById("leftArrow").addEventListener("click", () => {
  if (window.planetIndex < 6) {
    window.planetIndex++;
    dispatchPlanetChange();
    updateArrows();
  }
});

document.getElementById("rightArrow").addEventListener("click", () => {
  if (window.planetIndex > 0) { // 6 is Saturn's index
    window.planetIndex--;
    dispatchPlanetChange();
    updateArrows();
  }
});

function dispatchPlanetChange() {
  const planetChangedEvent = new CustomEvent("planetChange", {
    detail: { index: window.planetIndex }
  });
  console.log("Arrow Pressed!")
  window.dispatchEvent(planetChangedEvent);
}

function triggerUIReveal() {
  const ringSvg = document.getElementById("planetCenter");
  const circle = ringSvg.querySelector("circle");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");


  leftArrow.style.opacity = "0";
  rightArrow.style.opacity = "0";
  leftArrow.style.pointerEvents = "none";
  rightArrow.style.pointerEvents = "none";

  
  circle.style.strokeDashoffset = "0";


  setTimeout(()=>{
    updateArrows();
  },1300);
}



function removeUI(){
  const planetCenter = document.getElementById("planetCenter");
  const circle = planetCenter.querySelector("circle");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  const selector = document.getElementById("planetSelector");

  circle.style.strokeDashoffset = "314";

  setTimeout(()=>{
      selector.style.opacity = "0";
      selector.style.pointerEvents = "none";
      leftArrow.classList.remove("sweep-left");
      rightArrow.classList.remove("sweep-right");
  },2000);
}

function revealInfoBoxes() {
  const leftBox = document.getElementById("infoBoxLeft");
  const rightBox = document.getElementById("infoBoxRight");

  leftBox.style.pointerEvents = "auto";
  rightBox.style.pointerEvents = "auto";

  leftBox.style.opacity = "1";
  rightBox.style.opacity = "1";
}

function hideInfoBoxes(){
  const leftBox = document.getElementById("infoBoxLeft");
  const rightBox = document.getElementById("infoBoxRight");

  leftBox.style.pointerEvents = "none";
  rightBox.style.pointerEvents = "none";

  leftBox.style.transition = "opacity 2s";
  rightBox.style.transition = "opacity 2s";


  leftBox.style.opacity = "0";
  rightBox.style.opacity = "0";
}

window.addEventListener("circularBorder",() => {
    transformCanvasToHomeButton();
    setTimeout(()=>{
      showPlanetSelector();
      triggerUIReveal();
      setTimeout(()=>{
        revealInfoBoxes();
      },2000);
      
    },6000);

});

document.getElementById("planetCenter").addEventListener("click",
  () => {
    hideInfoBoxes();
    removeUI();
    setTimeout(()=>{
      console.log("return to solarSystem Pressed")
      transformCanvasToSolarSystem();
    },2000);
  }
)