import {planetData} from './mediaHandler/planetInfoData.js'
import * as HANDLER from './mediaHandler/mediaDisplayHandler.js'


function updateInfoBoxes(index) {

  const info = planetData[index];
  const leftBox = document.getElementById("infoBoxLeft");
  const rightBox = document.getElementById("infoBoxRight");

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

