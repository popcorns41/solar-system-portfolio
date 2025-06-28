window.addEventListener("DOMContentLoaded", () => {

  document.getElementById("enterSystem").addEventListener("click", () => {
    console.log("button pressed!")

    const introText = document.getElementById('introText');
    const intro_content = document.getElementById('intro-content');

    introText.style.display = 'none';
    intro_content.style.display = 'none';

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
});
});
