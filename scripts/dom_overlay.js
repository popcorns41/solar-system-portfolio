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







