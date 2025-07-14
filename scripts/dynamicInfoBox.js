import {planetData} from './mediaHandler/planetInfoData.js'
import * as HANDLER from './mediaHandler/mediaDisplayHandler.js'


export function updateInfoBoxes(index,leftBox,rightBox = null) {

  const info = planetData[index];

  leftBox.scrollTop = 0;
  if (rightBox){
    rightBox.scrollTop = 0;
  }

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
    const leftBox = document.getElementById("infoBoxLeft");
    const rightBox = document.getElementById("infoBoxRight");
    updateInfoBoxes(index,leftBox,rightBox);
});

window.addEventListener("planetChange", (event) => {
  const index = event.detail.index;
  console.log("We in a planet!",index);
  const leftBox = document.getElementById("infoBoxLeft");
  const rightBox = document.getElementById("infoBoxRight");
  updateInfoBoxes(index,leftBox,rightBox);
});


