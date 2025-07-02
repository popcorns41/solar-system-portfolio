export const assetCache = new Map();

// Preload images
const preloadImage = (key, url) => {
  const img = new Image();
  img.src = url;
  assetCache.set(key, img);
};

// Preload videos
const preloadVideo = (key, url) => {
  const video = document.createElement('video');
  video.src = url;
  video.preload = 'auto';
  video.muted = true; // avoid autoplay issues
  assetCache.set(key, video);
};

const preloadPDF = async (key, url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    assetCache.set(key, objectURL);
  } catch (error) {
    console.error(`Failed to preload PDF ${url}:`, error);
  }
};

export function preloadAssets() {
  preloadImage('cRobot', './info_images/childhoodRobot.jpeg');
  preloadImage('cvModel', './info_images/cv_model.jpeg');
  preloadImage('floorGeneral', './info_images/floorGeneral.jpeg');
  preloadImage('kpTeam', './info_images/kaPaoTeam.jpeg');
  preloadImage('ppGroup', './info_images/poolPalGroup.jpg');
  preloadImage('ppRobot', './info_images/poolpallRobot.jpeg');
  preloadImage('rAssemblyChildhood', './info_images/robotAssemblyChildhood.jpg');
  preloadImage('stepHandShake', './info_images/stepHandShake.jpg');
  preloadImage('stepProgramme','./info_images/stepProgramme.jpeg');
  preloadImage('salexLTD','./info_images/SalexLTD.jpeg');
  preloadVideo('poolpalShot', './info_images/poolpal_shot.mp4');

  preloadPDF('cvPDF','./pdfs/ohResume.pdf');

  console.log("images and videoes loaded")
}