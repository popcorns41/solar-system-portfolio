function fadeStateChange(eventName,bool){
            window.state.fadeBackground = bool;
            window.dispatchEvent(new CustomEvent(eventName, {
            detail: { key: "fadeBackground", value: bool }
            }));
        }


window.addEventListener("DOMContentLoaded", () => {
  if (!window.state) {
    console.error("window.state is not defined!");
    return;
  }

  document.getElementById("enterSystem").addEventListener("click", () => {
    console.log("button pressed!")

    const introText = document.getElementById('introText');
    const intro_content = document.getElementById('intro-content');

    introText.style.display = 'none';
    intro_content.style.display = 'none';

    //transformDownZoomOut();
    solarTransformDownZoomOut();

    window.addEventListener("sunZoomComplete", () => {
      console.log("Sun transform complete! Starting next sequence...");
      //intro.style.opacity='0';
      setTimeout(()=>{sequentialReveal(1000);},500);

      window.addEventListener("planetsInView", () => {
        document.getElementById('threeCanvas').style.pointerEvents = 'auto';
        window.dispatchEvent(new CustomEvent("beginTutorial"));
      });
  });
});
});
