import {planetData} from './mediaHandler/planetInfoData.js'
import * as HANDLER from './mediaHandler/mediaDisplayHandler.js'

function isMobile() {
  return window.innerWidth <= 768;
}

function updateMobileBox(index){
  const info = planetData[index];
  const leftBox = document.getElementById("infoBoxLeft");
  
  leftBox.scrollTop = 0;
  if (index == 0){
    HANDLER.contactMeSection(leftBox);
  }else if (index == 2){
    HANDLER.SkillSetList(leftBox);
    HANDLER.pdfResumeSection(rightBox);
  }else{
    HANDLER.planetDataMobileBox(info,leftBox);
  }
  HANDLER.planetLinkHandler();
}

function updateInfoBoxes(index) {

  const info = planetData[index];
  const leftBox = document.getElementById("infoBoxLeft");
  const rightBox = document.getElementById("infoBoxRight");

  leftBox.scrollTop = 0;
  rightBox.scrollTop = 0;

  if (index == 0){
    HANDLER.contactMeSection(leftBox);
  }else if (index == 2){
    HANDLER.SkillSetList(leftBox);
    HANDLER.pdfResumeSection(rightBox);
  }else{
    HANDLER.planetDataLeftBox(info,leftBox);
    HANDLER.planetDataRightBox(info,rightBox);
  }
  HANDLER.planetLinkHandler();
}

function resSupportGate(index){
  if (!(isMobile())) {
    updateInfoBoxes(index);
  }else{
    updateMobileBox(index);
  }
}

window.addEventListener("solarSystemToInfoSection", (event) =>{
    const index = event.detail.index;
    console.log("We in a planet!",index);
    resSupportGate(index);
});

window.addEventListener("planetChange", (event) => {
  const index = event.detail.index;
  console.log("We in a planet!",index);
  resSupportGate(index);
});


