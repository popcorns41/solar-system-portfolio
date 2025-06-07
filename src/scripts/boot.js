window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

window.addEventListener('DOMContentLoaded', () => {
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
  setTimeout(() => {solarStartSunrise();},3000);

  window.addEventListener("sunRose", () => {
    console.log("sun has arisen B-)")
    const generateButton = document.getElementById("enterSystem");
    generateButton.style.display = "block";
  });
  
});

