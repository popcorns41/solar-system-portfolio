let planetData=[{title:"Contact me",paragraphs:["The Sun is the star at the center of our solar system.","It provides the light and heat necessary for life on Earth."],images:["",""],imageDescription:["",""],videos:[""],videoDescription:["",""]},{title:"Resume",paragraphs:["Mercury is the closest planet to the Sun.","It has a very thin atmosphere and extreme temperature fluctuations."],images:["",""],imageDescription:["",""],videos:[""],videoDescription:["",""]},{title:"Skill sets",paragraphs:["Venus is the second planet from the Sun and has a thick, toxic atmosphere.","Its surface temperature is hotter than Mercury's despite being farther from the Sun."],images:["",""],imageDescription:["",""],videos:[""],videoDescription:["",""]},{title:"Robotics",paragraphs:["Earth is the third planet from the Sun and the only known planet to support life.","It has a diverse climate and a protective magnetic field."],images:["./info_images/poolpallRobot.jpeg","./info_images/cv_model.jpeg"],imageDescription:["Pool Pal in idle position","OpenCV Model utilised in tracking and determining cue ball position"],videos:["./info_images/poolpal_shot.mp4"],videoDescription:["Pool Pal in operation"]},{title:"Extracurricular",paragraphs:["Mars is often called the Red Planet due to its reddish appearance.","It has the tallest volcano and the deepest canyon in the solar system."],images:["",""],imageDescription:["",""],videos:[""],videoDescription:["",""]},{title:"Childhood",paragraphs:["Jupiter is the largest planet in the solar system.","It has a strong magnetic field and dozens of moons."],images:["",""],imageDescription:["",""],videos:[""],videoDescription:["",""]},{title:"About me",paragraphs:["Saturn is known for its stunning ring system.","It is a gas giant with a low density and many moons."],images:["",""],imageDescription:["",""],videos:[""],videoDescription:["",""]}];function updateInfoBoxes(e){let t=planetData[e];console.log(t.title);let i=document.getElementById("infoBoxLeft"),o=document.getElementById("infoBoxRight");i.innerHTML=`
    <h2>${t.title}</h2>
    <p>${t.paragraphs[0]}</p>
    <p>${t.paragraphs[1]}</p>
  `,o.innerHTML=`
    ${t.images.map((e,i)=>{var o;return`
          <div id="image${i+1}" style="margin-bottom: 1.5rem;">
            <img src="${e}" alt="${t.title} Image ${i+1}" 
                style="width: 100%; border-radius: 10px;" />
            <p style="margin: 0.5rem 0; font-size: 0.9rem;">
              Image ${i+1}: ${(null==(o=t.imageDescription)?void 0:o[i])||""}
            </p>
            <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />
          </div>
        `}).join("")}
    ${t.videos.map((e,i)=>{var o;return`
          <div id="video${i+1}" style="margin-bottom: 1.5rem;">
            <video controls style="width: 100%; border-radius: 10px;">
              <source src="${e}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p style="margin: 0.5rem 0; font-size: 0.9rem;">
              Video ${i+1}: ${(null==(o=t.videoDescription)?void 0:o[i])||""}
            </p>
            ${i<t.videos.length-1?'<hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />':""}
          </div>
        `}).join("")}
  `}window.addEventListener("solarSystemToInfoSection",e=>{let t=e.detail.index;console.log("We in a planet!",t),updateInfoBoxes(t)}),window.addEventListener("planetChange",e=>{let t=e.detail.index;console.log("We in a planet!",t),updateInfoBoxes(t)});
//# sourceMappingURL=solar-system-portfolio.00a848f6.js.map
