import {planetData} from './mediaHandler/planetInfoData.js'
import { assetCache } from './mediaHandler/mediaCache';


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
  

   rightBox.innerHTML = ""; // Clear previous content

  // IMAGES
    info.imageKeys.forEach((key, index) => {
      const wrapper = document.createElement("div");
      wrapper.id = `image${index + 1}`;
      wrapper.style.marginBottom = "1.5rem";

      let img = assetCache.get(key)?.cloneNode(true);

      // Fallback if not in cache
      if (!img) {
        img = new Image();
        img.src = info.imageURLs?.[index] || '';
      }

      img.alt = `${info.title} Image ${index + 1}`;
      img.style.width = "100%";
      img.style.borderRadius = "10px";
      wrapper.appendChild(img);

      const caption = document.createElement("p");
      caption.style.margin = "2rem 0";
      caption.style.fontSize = "0.9rem";

      caption.innerHTML = `Image ${index + 1}: ${info.imageDescription?.[index] || ''}`;
      wrapper.appendChild(caption);

      const hr = document.createElement("hr");
      hr.style.border = "none";
      hr.style.borderTop = "1px solid #ccc";
      hr.style.margin = "0.5rem 0";
      wrapper.appendChild(hr);

      rightBox.appendChild(wrapper);
    });

    // VIDEOS
    info.videoKeys.forEach((key, index) => {
      const wrapper = document.createElement("div");
      wrapper.id = `video${index + 1}`;
      wrapper.style.marginBottom = "1.5rem";

      let video = assetCache.get(key)?.cloneNode(true);

      // Fallback if not in cache
      if (!video) {
        video = document.createElement("video");
        const source = document.createElement("source");
        source.src = info.videoURLs?.[index] || '';
        source.type = "video/mp4";
        video.appendChild(source);
        video.preload = "auto";
      }

      video.controls = true;
      video.style.width = "100%";
      video.style.borderRadius = "10px";
      wrapper.appendChild(video);

      const caption = document.createElement("p");
      caption.style.margin = "0.5rem 0";
      caption.style.fontSize = "0.9rem";

      caption.innerHTML = `Video ${index + 1}: ${info.videoDescription?.[index] || ''}`;
      wrapper.appendChild(caption);

      if (index < info.videoKeys.length - 1) {
        const hr = document.createElement("hr");
        hr.style.border = "none";
        hr.style.borderTop = "1px solid #ccc";
        hr.style.marginTop = "1rem";
        wrapper.appendChild(hr);
      }

      rightBox.appendChild(wrapper);
    });

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

