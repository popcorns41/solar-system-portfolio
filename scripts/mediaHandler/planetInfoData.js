export const planetData = [
  {
    title: "Contact me",
    subtitles: [""],
    paragraphs: [
      "The Sun is the star at the center of our solar system.",
      "It provides the light and heat necessary for life on Earth."
    ],
    imageURLs: ["",""],
    imageKeys: ["", ""],
    imageDescription: ["",""],
    videoURLs: [""],
    videoKeys: [""],
    videoDescription: ["",""]
  },
  {
    title: "Resume",
    subtitles: [""],
    paragraphs: [
      "Mercury is the closest planet to the Sun.",
      "It has a very thin atmosphere and extreme temperature fluctuations."
    ],
    imageURLs: ["",""],
    imageKeys: ["", ""],
    imageDescription: ["",""],
    videoURLs: [""],
    videoKeys: [""],
    videoDescription: ["",""]
  },
  {
    title: "Skill sets",
    subtitles: [""],
    paragraphs: [
      "Venus is the second planet from the Sun and has a thick, toxic atmosphere.",
      "Its surface temperature is hotter than Mercury's despite being farther from the Sun."
    ],
    imageURLs: ["",""],
    imageKeys: ["", ""],
    imageDescription: ["",""],
    videoURLs: [""],
    videoKeys: [""],
    videoDescription: ["",""]
  },
  {
    title: "Robotics",
    subtitles: ["Overview","Reflection"],
    paragraphs: [
      "Working with the University of Edinburgh's maker space and a strong team of peers, we built a robot that plays pool on a half-scale table. The semester-long project combined several engineering disciplines. We divided the robot's systems into key modules: electrical, robotic, computer vision and camera (see<a href='#image2'>Image 2</a>), structural support, and a mobile web app for user input. In a typical use case, the web app shows a real-time view of the pool balls and prompts the user—via a mobile game-style UI—to take a shot. The robot, which we called Pool Pal, then attempts to replicate that shot. At the end of the project, our robot could successfully pot pool balls at an impressive accuracy (see<a href='#video1'>Video 1</a>). I was responsible for designing, testing, and assembling the robotic system, which consisted of two main components: the gantry and the striking mechanism.",
      "Our design was well-received by the judges: out of 16 teams, we won the <b>Best Technical Skills Project award</b> and placed <b>second overall</b> at a university-hosted competition. Teamwork was critical to our success. With members collaborating across multiple systems, clear and consistent communication was essential. One example was calibrating the gantry system's sensors, which helped manage the loss of timing belt tension over time. Solving this problem required close collaboration between the electrical lead and me, as we combined our efforts to tackle the issue effectively."
    ],
    imageURLs: ["./info_images/poolpallRobot.jpeg", "./info_images/cv_model.jpeg"],
    imageKeys: ["ppRobot", "cvModel"],
    imageDescription: ["Pool Pal in idle position","OpenCV Model utilised in tracking and determining cue ball position"],
    videoURLs: ["./info_images/poolpal_shot.mp4"],
    videoKeys: ["poolpalShot"],
    videoDescription: ["Pool Pal in operation"]
  },
  {
    title: "Extracurricular",
    subtitles: ["Basketball","Hospitality"],
    paragraphs: [
      "Outside of tech, I'm a player and coach with the Edinburgh University Basketball Club. Coaching has sharpened my leadership, communication, and planning skills, all of which apply to computer science, particularly when working in teams, thinking quickly on my feet, and delivering clear solutions under pressure.",
      "Alongside my studies, I've worked part-time at Ka Pao Edinburgh for three years, training in both front-of-house and bartending. The role sharpened my ability to multitask, communicate clearly, and stay calm under pressure. These skills carry directly into computer science, from team collaboration to debugging under tight deadlines."
    ],
    imageURLs: ["./info_images/floorGeneral.jpeg", "./info_images/kaPaoTeam.jpeg"],
    imageKeys: ["floorGeneral", ".kpTeam"],
    imageDescription: ["Basketball scrimmage at Pleasance Gym, Edinburgh","Photo of the team at Ka Pao Edinburgh"],
    videoURLs: [],
    videoKeys: [],
    videoDescription: []
  },
  {
    title: "Childhood",
    subtitles: [""],
    paragraphs: [
      "Jupiter is the largest planet in the solar system.",
      "It has a strong magnetic field and dozens of moons."
    ],
    imageURLs: ["./info_images/childhoodRobot.jpeg", "./info_images/robotAssemblyChildhood.jpg"],
    imageKeys: ["cRobot", ".rAssemblyChildhood"],
    imageDescription: ["Home appliance robot for WRO competition","Assembly of Robot with peers"],
    videoURLs:[],
    videoKeys: [],
    videoDescription: []
  },
  {
    title: "About me",
    subtitles: ["Who am I?","What is this website?"],
    paragraphs: [
"Hello, my name is Oliver! I am a fourth-year student of BEng Computer Science at the University of Edinburgh. With over eight years of experience in IT, both personally and academically, I'm eager to apply my skills in a real-world environment, learn from experienced engineers, and contribute to impactful projects. I'm a fast learner, naturally collaborative, and focused on delivering value wherever I can. My main interests lie in robotics and software systems design and development, areas where I’ve earned recognition and awards (see <a href='#image1'>Image 1</a> and <a href='#image2'>Image 2</a>).",      "This personal portfolio website was a personal project to reimagine site navigation through a fully interactive 3D solar system. Each planet acts as a portal to different sections of the portfolio. Built with Vite and Three.js, the project aims to showcase my web development skills, combined with a new area of technology for me in 3D modelling to create a visually engaging and unconventional user experience. The project showcases proficiency in JavaScript, modular design, event-driven interactions, and creative UI/UX thinking. I encourage you to explore the GitHub repository for this project:<a href='https://github.com/popcorns41/solar-system-portfolio'target='_blank' rel='noopener noreferrer'>here</a>to browse how this project's inspiration and current development stage."
    ],
    imageURLs: ["./info_images/stepHandShake.jpg", "./info_images/poolPalGroup.jpg"],
    imageKeys: ["stepHandShake", "ppGroup"],
    imageDescription: ["Award ceremony for internship programme (further details see<a href='#' class='planet-link' data-index='1'>here</a>)","Group photo during robotics fair (further details see <a href='#' class='planet-link' data-index='3'>here</a>)"],
    videoURLs: [],
    videoKeys: [],
    videoDescription: []
  }
];