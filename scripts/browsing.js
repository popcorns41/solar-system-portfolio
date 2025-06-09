function transformCanvasToHomeButton() {
  const canvas = document.getElementById("threeCanvas");
  const card = document.getElementById("tutorialCard");

  canvas.style.pointerEvents = "none";

  card.style.display = "none";

  // First: scale and round the canvas
  const scale = 200 / window.innerWidth; // target width is 150px
  canvas.style.transition = "transform 7s ease, border-radius 7s ease";
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

function updateArrows() {
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");
  const index = window.planetIndex;

  // Reset classes to re-trigger animation if needed
  leftArrow.classList.remove("sweep-left");
  rightArrow.classList.remove("sweep-right");

  // Delay re-adding for animation retriggering
  setTimeout(() => {
    if (index === 0) {
      // At Saturn (last planet)
      leftArrow.style.opacity = "1";
      leftArrow.style.pointerEvents = "auto";
      rightArrow.style.opacity = "0";
      rightArrow.style.pointerEvents = "none";
      leftArrow.classList.add("sweep-left");

    } else if (index === 6) {
      // At Sun (first planet)
      leftArrow.style.opacity = "0";
      leftArrow.style.pointerEvents = "none";
      rightArrow.style.opacity = "1";
      rightArrow.style.pointerEvents = "auto";
      rightArrow.classList.add("sweep-right");

    } else {
      // Middle planets
      leftArrow.style.opacity = "1";
      rightArrow.style.opacity = "1";
      leftArrow.style.pointerEvents = "auto";
      rightArrow.style.pointerEvents = "auto";
      leftArrow.classList.add("sweep-left");
      rightArrow.classList.add("sweep-right");
    }
  }, 10); // Small timeout to ensure animation can retrigger
}
function updateInfoDisplay() {
  const leftBox = document.getElementById("infoBoxLeft");
  const rightBox = document.getElementById("infoBoxRight");
  const infoSection = document.getElementById("infoSection");
  const index = window.planetIndex;
  // Always show left box
  leftBox.style.display = "block";
  leftBox.style.opacity = "1";
  leftBox.style.pointerEvents = "auto";

  if (index === 0) {
    // Only show left box for index 0 (Sun)
    rightBox.style.display = "none";
    rightBox.style.opacity = "0";
    rightBox.style.pointerEvents = "none";
  } else {
    // Show both for other planets
    rightBox.style.display = "block";
    rightBox.style.opacity = "1";
    rightBox.style.pointerEvents = "auto";
  }

  // Reveal section (if hidden)
  infoSection.style.display = "flex";
}

document.getElementById("leftArrow").addEventListener("click", () => {
  if (window.planetIndex < 6) {
    window.planetIndex++;
    dispatchPlanetChange();
    updateInfoDisplay();
    updateArrows();
  }
});

document.getElementById("rightArrow").addEventListener("click", () => {
  if (window.planetIndex > 0) { // 6 is Saturn's index
    window.planetIndex--;
    dispatchPlanetChange();
    updateInfoDisplay();
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

  // Always reveal the left box
  leftBox.style.pointerEvents = "auto";
  leftBox.style.opacity = "1";
  leftBox.style.display = "block";

  if (window.planetIndex === 0) {
    // Hide the right box for the Sun
    rightBox.style.pointerEvents = "none";
    rightBox.style.opacity = "0";
    rightBox.style.display = "none";
  } else {
    // Show and enable the right box
    rightBox.style.pointerEvents = "auto";
    rightBox.style.opacity = "1";
    rightBox.style.display = "block";
  }

  setTimeout(() => {
    uiFinished = true;
  }, 500);
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

let uiFinished = false;

window.addEventListener("circularBorder",() => {
    transformCanvasToHomeButton();
    setTimeout(()=>{
      showPlanetSelector();
      triggerUIReveal();
      setTimeout(()=>{
        revealInfoBoxes();
      },2000);
      
    },5000);

});

document.getElementById("planetCenter").addEventListener("click",
  () => {
    if (!uiFinished) return;
    uiFinished = false;
    hideInfoBoxes();
    removeUI();
    setTimeout(()=>{
      console.log("return to solarSystem Pressed")
      transformCanvasToSolarSystem();
    },2000);
  }
)