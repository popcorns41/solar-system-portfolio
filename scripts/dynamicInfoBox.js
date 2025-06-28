const planetData = [
  {
    title: "Contact me",
    subtitles: [""],
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
    subtitles: [""],
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
    subtitles: [""],
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
    subtitles: ["Overview","Reflection"],
    paragraphs: [
      "Working with the University of Edinburgh's maker space and a strong team of peers, we built a robot that plays pool on a half-scale table. The semester-long project combined several engineering disciplines. We divided the robot's systems into key modules: electrical, robotic, computer vision and camera (see<a href='#image2'>Image 2</a>), structural support, and a mobile web app for user input. In a typical use case, the web app shows a real-time view of the pool balls and prompts the user—via a mobile game-style UI—to take a shot. The robot, which we called Pool Pal, then attempts to replicate that shot. It successfully made shots (see<a href='#video1'>Video 1</a>), proving the concept worked. I was responsible for designing, testing, and assembling the robotic system, which consisted of two main components: the gantry and the striking mechanism.",
      "Our design was well-received by the judges: out of 16 teams, we won the <b>Best Technical Skills Project award</b> and placed <b>second overall</b> at a university-hosted competition. Teamwork was critical to our success. With members collaborating across multiple systems, clear and consistent communication was essential. One example was calibrating the gantry system's sensors, which helped manage the loss of timing belt tension over time. Solving this problem required close collaboration between the electrical lead and me, as we combined our efforts to tackle the issue effectively."
    ],
    images: ["./info_images/poolpallRobot.jpeg", "./info_images/cv_model.jpeg"],
    imageDescription: ["Pool Pal in idle position","OpenCV Model utilised in tracking and determining cue ball position"],
    videos: ["./info_images/poolpal_shot.mp4"],
    videoDescription: ["Pool Pal in operation"]
  },
  {
    title: "Extracurricular",
    subtitles: ["Basketball","Hospitality"],
    paragraphs: [
      "Outside of tech, I'm a player and coach with the Edinburgh University Basketball Club. Coaching has sharpened my leadership, communication, and planning skills, all of which apply to computer science, particularly when working in teams, thinking quickly on my feet, and delivering clear solutions under pressure.",
      "Alongside my studies, I've worked part-time at Ka Pao Edinburgh for three years, training in both front-of-house and bartending. The role sharpened my ability to multitask, communicate clearly, and stay calm under pressure. These skills carry directly into computer science, from team collaboration to debugging under tight deadlines."
    ],
    images: ["./info_images/floorGeneral.jpeg", "./info_images/kaPaoTeam.jpeg"],
    imageDescription: ["Basketball scrimmage at Pleasance Gym, Edinburgh","Photo of the team at Ka Pao Edinburgh"],
    videos: [],
    videoDescription: []
  },
  {
    title: "Childhood",
    subtitles: [""],
    paragraphs: [
      "Jupiter is the largest planet in the solar system.",
      "It has a strong magnetic field and dozens of moons."
    ],
    images: ["./info_images/childhoodRobot.jpeg", "./info_images/robotAssemblyChildhood.jpg"],
    imageDescription: ["Home appliance robot for WRO competition","Assembly of Robot with peers"],
    videos: [],
    videoDescription: []
  },
  {
    title: "About me",
    subtitles: [""],
    paragraphs: [
      "With over eight years of personal and academic experience in computer science, I'm eager to apply my skills in a real-world environment, learn from experienced engineers, and contribute to impactful projects. I'm a fast learner, naturally collaborative, and focused on delivering value wherever I can. My main interests lie in robotics and software systems design and development, areas where I've earned recognition and awards (see<a href='#image1'>Image 1</a>and<a href='#image2'>Image 2</a>)."
    ],
    images: ["./info_images/stepHandShake.jpg", "./info_images/poolPalGroup.jpg"],
    imageDescription: ["Award ceremony for internship programme (further details see<a href='#' class='planet-link' data-index='1'>here</a>)","Group photo during robotics fair (further details see <a href='#' class='planet-link' data-index='3'>here</a>)"],
    videos: [],
    videoDescription: []
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
  <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />
  ${info.paragraphs.map((text, index) => `
    <h3 style="padding: 1rem 0 0.5rem 0;">${info.subtitles[index]}</h3>
    <p>${text}</p>
  `).join('')}
`;


  rightBox.innerHTML = `
    ${info.images
      .map(
        (img, index) => `
          <div id="image${index + 1}" style="margin-bottom: 1.5rem;">
            <img src="${img}" alt="${info.title} Image ${index + 1}" 
                style="width: 100%; border-radius: 10px;" />
            <p style="margin: 2rem 0; font-size: 0.9rem;">
              Image ${index + 1}: ${info.imageDescription?.[index] || ''}
            </p>
            <hr style="border: none; border-top: 1px solid #ccc; margin: 0.5rem 0;" />
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

  document.querySelectorAll(".planet-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(e.currentTarget.dataset.index, 10);
      console.log(index);
      window.dispatchEvent(new CustomEvent("planetChange", {
        detail: { index }
      }));
      window.dispatchEvent(new CustomEvent("updateArrows",{
        detail: { index }
      }));
    });
  });
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

