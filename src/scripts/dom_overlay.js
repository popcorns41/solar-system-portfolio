window.addEventListener("fadeToBlack", (event) => {
  const { key, value } = event.detail;
  if (value === true) {
    window.fadeToBlack()
  }
});

window.addEventListener("fadeFromBlack", (event) => {
  const { key, value } = event.detail;
  if (value === false) {
    window.fadeFromBlack()
  }
});

window.addEventListener("beginTutorial", () => {
  setTimeout(() => {
    const card = document.getElementById("tutorialCard");
    card.classList.add("show");
  }, 500);
});

  document.getElementById("closeTutorial").addEventListener("click", () => {
    const card = document.getElementById("tutorialCard");
    card.style.display="none";
  });


// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
// overlayScene.add(hemiLight);







