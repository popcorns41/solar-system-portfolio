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

export function preloadAssets() {
  preloadImage('cRobot', './info_images/childhoodRobot.jpeg');
  preloadImage('cvModel', './info_images/cv_model.jpeg');
  preloadImage('floorGeneral', './info_images/floorGeneral.jpeg');
  preloadImage('kpTeam', './info_images/kaPaoTeam.jpeg');
  preloadImage('ppGroup', './info_images/poolPalGroup.jpg');
  preloadImage('ppRobot', './info_images/poolpallRobot.jpeg');
  preloadImage('rAssemblyChildhood', './info_images/robotAssemblyChildhood.jpg');
  preloadImage('stepHandShake', './info_images/stepHandShake.jpg');
  preloadVideo('poolpalShot', './info_images/poolpal_shot.mp4');

  console.log("images and videoes loaded")
  // etc...
}