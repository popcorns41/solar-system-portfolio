const planetData = [
  {
    title: "The Sun",
    paragraphs: [
      "The Sun is the star at the center of our solar system.",
      "It provides the light and heat necessary for life on Earth."
    ],
    images: ["", ""]
  },
  {
    title: "Mercury",
    paragraphs: [
      "Mercury is the closest planet to the Sun.",
      "It has a very thin atmosphere and extreme temperature fluctuations."
    ],
    images: ["", ""]
  },
  {
    title: "Venus",
    paragraphs: [
      "Venus is the second planet from the Sun and has a thick, toxic atmosphere.",
      "Its surface temperature is hotter than Mercury's despite being farther from the Sun."
    ],
    images: ["", ""]
  },
  {
    title: "Earth",
    paragraphs: [
      "Earth is the third planet from the Sun and the only known planet to support life.",
      "It has a diverse climate and a protective magnetic field."
    ],
    images: ["", ""]
  },
  {
    title: "Mars",
    paragraphs: [
      "Mars is often called the Red Planet due to its reddish appearance.",
      "It has the tallest volcano and the deepest canyon in the solar system."
    ],
    images: ["", ""]
  },
  {
    title: "Jupiter",
    paragraphs: [
      "Jupiter is the largest planet in the solar system.",
      "It has a strong magnetic field and dozens of moons."
    ],
    images: ["", ""]
  },
  {
    title: "Saturn",
    paragraphs: [
      "Saturn is known for its stunning ring system.",
      "It is a gas giant with a low density and many moons."
    ],
    images: ["", ""]
  }
];

function updateInfoBoxes(index) {
  const info = planetData[index];
  console.log(info.title);
  const leftBox = document.getElementById("infoBoxLeft");
  const rightBox = document.getElementById("infoBoxRight");

  // Update Left Box
  leftBox.innerHTML = `
    <h2>${info.title}</h2>
    <p>${info.paragraphs[0]}</p>
    <p>${info.paragraphs[1]}</p>
  `;

  // Update Right Box with Images
  rightBox.innerHTML = `
    <img src="${info.images[0]}" alt="${info.title} Image 1" style="width: 100%; margin-bottom: 1rem;" />
    <img src="${info.images[1]}" alt="${info.title} Image 2" style="width: 100%;" />
  `;
}

window.addEventListener("solarSystemToInfoSection", (event) =>{
    const index = event.detail.index;
    console.log("We in a planet!",index);
    updateInfoBoxes(index);
});

window.addEventListener("planetChange", (event) => {
  const index = event.detail.index;
  console.log("We in a planet!",index);
  updateInfoBoxes(index);
});