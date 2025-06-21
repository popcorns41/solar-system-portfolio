const planetData = [
  {
    title: "Contact me",
    paragraphs: [
      "The Sun is the star at the center of our solar system.",
      "It provides the light and heat necessary for life on Earth."
    ],
    images: ["", ""],
    imageDescription: ["",""],
    videos: [""],
    videoDescription: ["",""]
  },
  {
    title: "Resume",
    paragraphs: [
      "Mercury is the closest planet to the Sun.",
      "It has a very thin atmosphere and extreme temperature fluctuations."
    ],
    images: ["", ""],
    imageDescription: ["",""],
    videos: [""],
    videoDescription: ["",""]
  },
  {
    title: "Skill sets",
    paragraphs: [
      "Venus is the second planet from the Sun and has a thick, toxic atmosphere.",
      "Its surface temperature is hotter than Mercury's despite being farther from the Sun."
    ],
    images: ["", ""],
    imageDescription: ["",""],
    videos: [""],
    videoDescription: ["",""]
  },
  {
    title: "Robotics",
    paragraphs: [
      "Earth is the third planet from the Sun and the only known planet to support life.",
      "It has a diverse climate and a protective magnetic field."
    ],
    images: ["./info_images/poolpallRobot.jpeg", "./info_images/cv_model.jpeg"],
    imageDescription: ["Pool Pal in idle position","OpenCV Model utilised in tracking and determining cue ball position"],
    videos: ["./info_images/poolpal_shot.mp4"],
    videoDescription: ["Pool Pal in operation"]
  },
  {
    title: "Extracurricular",
    paragraphs: [
      "Mars is often called the Red Planet due to its reddish appearance.",
      "It has the tallest volcano and the deepest canyon in the solar system."
    ],
    images: ["", ""],
    imageDescription: ["",""],
    videos: [""],
    videoDescription: ["",""]
  },
  {
    title: "Childhood",
    paragraphs: [
      "Jupiter is the largest planet in the solar system.",
      "It has a strong magnetic field and dozens of moons."
    ],
    images: ["", ""],
    imageDescription: ["",""],
    videos: [""],
    videoDescription: ["",""]
  },
  {
    title: "About me",
    paragraphs: [
      "Saturn is known for its stunning ring system.",
      "It is a gas giant with a low density and many moons."
    ],
    images: ["", ""],
    imageDescription: ["",""],
    videos: [""],
    videoDescription: ["",""]
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

  rightBox.innerHTML = `
    ${info.images
      .map(
        (img, index) => `
          <div id="image${index + 1}" style="margin-bottom: 1.5rem;">
            <img src="${img}" alt="${info.title} Image ${index + 1}" 
                style="width: 100%; border-radius: 10px;" />
            <p style="margin: 0.5rem 0; font-size: 0.9rem;">
              Image ${index + 1}: ${info.imageDescription?.[index] || ''}
            </p>
            <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />
          </div>
        `
      )
      .join("")}
    ${info.videos
      .map(
        (vid, index) => `
          <div id="video${index + 1}" style="margin-bottom: 1.5rem;">
            <video controls style="width: 100%; border-radius: 10px;">
              <source src="${vid}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p style="margin: 0.5rem 0; font-size: 0.9rem;">
              Video ${index + 1}: ${info.videoDescription?.[index] || ''}
            </p>
            ${
              index < info.videos.length - 1
                ? `<hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />`
                : ``
            }
          </div>
        `
      )
      .join("")}
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