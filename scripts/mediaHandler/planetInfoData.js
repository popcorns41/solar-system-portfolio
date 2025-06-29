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
      "Outside of tech, I'm both a player and coach with the Edinburgh University Basketball Club. Coaching has strengthened my leadership, communication, and strategic planning. Skills that translate directly to computer science, especially when working in teams, adapting under pressure, and staying disciplined through intensive training and competition.",
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
    subtitles: ["Robotic competitions","Introduction to programming"],
    paragraphs: [
      "Between 2015 and 2018, I took part in regional robotics competitions across Thailand, including the World Robotics Olympiad (<a href='https://wro-association.org/'>WRO</a>), which brings together students to solve LEGO Mindstorm challenges. The prompts ranged from building home appliance robots to tackling unpredictable terrain, pushing us to think creatively under pressure. These early years introduced me to the world of robotics: programming sensors, engineering moving parts, and the basics of robotic localisation. Our team won several regional prizes, and while we didn’t quite reach the international stage, the experience sparked a lasting passion for building and problem-solving.",
      "During my early robotics training, I began with block-based programming environments like LEGO Mindstorms NXT-G, which helped me grasp fundamental logic and control flow. As I took on more complex challenges, I transitioned to writing JavaScript scripts to directly control robot behaviour. A shift that gave me greater flexibility and precision. Learning JavaScript through robotics sparked my curiosity in applying it beyond physical machines, making the leap to web development feel natural. The language that once powered my robots soon became the tool I used to build interactive websites and creative digital experiences."
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
"Hello, my name is Oliver! I am a fourth-year student of BEng Computer Science at the University of Edinburgh. With over eight years of experience in IT, both personally and academically, I'm eager to apply my skills in a real-world environment, learn from experienced engineers, and contribute to impactful projects. I'm a fast learner, naturally collaborative, and focused on delivering value wherever I can. My main interests lie in robotics and software systems design and development, areas where I’ve earned recognition and awards (see <a href='#image1'>Image 1</a> and <a href='#image2'>Image 2</a>).",
"This personal portfolio website was a personal project to reimagine site navigation through a fully interactive 3D solar system. Each planet acts as a portal to different sections of the portfolio. Built with Vite and Three.js, the project aims to showcase my web development skills, combined with a new area of technology for me in 3D modelling to create a visually engaging and unconventional user experience. The project showcases proficiency in JavaScript, modular design, event-driven interactions, and creative UI/UX thinking. I invite you to explore the GitHub repository for this project:<a href='https://github.com/popcorns41/solar-system-portfolio'target='_blank' rel='noopener noreferrer'>here</a>to browse this project's inspiration and current development stage."
    ],
    imageURLs: ["./info_images/stepHandShake.jpg", "./info_images/poolPalGroup.jpg"],
    imageKeys: ["stepHandShake", "ppGroup"],
    imageDescription: ["Award ceremony for internship programme (further details see<a href='#' class='planet-link' data-index='1'>here</a>)","Group photo during robotics fair (further details see <a href='#' class='planet-link' data-index='3'>here</a>)"],
    videoURLs: [],
    videoKeys: [],
    videoDescription: []
  }
];