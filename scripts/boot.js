import {preloadAssets} from "./mediaHandler/mediaCache.js";
import {generateStaticPage,populateStaticPage} from './staticPage.js'

window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

window.addEventListener("DOMContentLoaded", ()=>{
  preloadAssets();
  document.getElementById("enterSystem").addEventListener("click", () => {

    const introText = document.getElementById('introText');
    const intro_content = document.getElementById('intro-content');
    
    const checked = document.getElementById("modeSwitch")?.checked;

    if (checked){
      generateStaticPage();
      populateStaticPage();
      document.getElementById("staticPageNav").classList.add("show");

      const checkBox = document.getElementById("slider");
      const generateButton = document.getElementById("enterSystem");

      checkBox.style.transition = "opacity 2s ease, transform 2s ease";
      checkBox.style.transform = "translateY(-20px)";
      checkBox.style.opacity = "0";
      introText.style.transition = "opacity 2s ease, transform 2s ease";
      introText.style.transform = "translateY(-20px)";
      introText.style.opacity = "0";
      
      intro_content.style.transition = "opacity 2s ease, transform 2s ease";
      intro_content.style.transform = "translateY(-20px)";
      intro_content.style.opacity = "0";

      document.documentElement.style.overflowY = 'auto'; 
      document.body.style.overflowY = 'auto';  
      setTimeout(() => {
          introText.style.display = 'none';
          intro_content.style.display = 'none';
      },1500);
    }else{
      solarPlanetInit();
      introText.style.display = 'none';
      intro_content.style.display = 'none';
      }
  });
});


function solarPlanetInit(){
   window.dispatchEvent(new CustomEvent("solarTransformDownZoomOutCue"));
    window.addEventListener("sunZoomComplete", () => {
      console.log("Sun transform complete! Starting next sequence...");
      //intro.style.opacity='0';
      const revealEvent = new  CustomEvent("revealPlanets",{
        detail: {delay:1000}
      });
      setTimeout(()=>{window.dispatchEvent(revealEvent)},500);

      window.addEventListener("planetsInView", () => {
        document.getElementById('threeCanvas').style.pointerEvents = 'auto';
        window.dispatchEvent(new CustomEvent("beginTutorial"));
      });
    });

}


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
      const checkBox = document.getElementById("slider");
      const generateButton = document.getElementById("enterSystem");
      checkBox.style.opacity = "1";
      generateButton.style.opacity = "1";
      generateButton.style.pointerEvents = "auto";
      checkBox.style.pointerEvents = "auto";
    });
}

