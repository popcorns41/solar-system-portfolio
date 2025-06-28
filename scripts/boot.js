import {preloadAssets} from "./mediaHandler/mediaCache.js";

window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

window.addEventListener("DOMContentLoaded", ()=>{
  preloadAssets();
});

window.addEventListener('solarSystemReady', () => {
  const params = new URLSearchParams(window.location.search);
  const isDevMode = params.has('dev');
  if (!(isDevMode)){
    initHomePage();
  }else{
    initDevHomePage();
  }
});


function initDevHomePage(){
  const intro_content = document.getElementById('intro-content');
  intro_content.style.display = 'none';
  document.getElementById('threeCanvas').style.pointerEvents = 'auto';
}

function initHomePage(){
  console.log("DOM fully loaded and parsed, starting boot process");

    window.addEventListener('sunLoaded', () => {console.log("sun loaded, starting animation");});

    const introText = document.getElementById('introText');
    const introInstructions = document.getElementById('instruction');

    document.getElementById('threeCanvas').style.pointerEvents = 'none';

    // Step 1: Show title
    setTimeout(() => {
      introText.style.opacity = '1';
      introText.style.transform = 'translateY(0)';
    }, 200);

    // Step 2: Show instructions later
    setTimeout(() => {
      introInstructions.style.opacity = '1';
      introInstructions.style.transform = 'translateY(0)';
      
    }, 1500);
    setTimeout(() => {
      window.dispatchEvent(new Event("beginSunrise"));
    }, 3000);

    window.addEventListener("sunRose", () => {
      console.log("sun has arisen B-)")
      const generateButton = document.getElementById("enterSystem");
      generateButton.style.opacity = "1";
      generateButton.style.pointerEvents = "auto";
    });
}

