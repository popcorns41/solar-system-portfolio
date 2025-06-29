import { assetCache } from './mediaCache';
import { languages,platforms,roboticsItems } from './iconDirectories';

export function planetDataLeftBox(info,leftBox){
  // Update Left Box
  leftBox.innerHTML = `
    <h2>${info.title}</h2>
    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem;" />
    ${info.paragraphs.map((text, index) => `
      <h3 style="padding: 1rem 0 0.5rem 0;">${info.subtitles[index]}</h3>
      <p>${text}</p>
    `).join('')}
  `;
}

export function planetDataRightBox(info,rightBox){

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
}

export function planetLinkHandler(){
      document.querySelectorAll(".planet-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(e.currentTarget.dataset.index, 10);
      window.dispatchEvent(new CustomEvent("planetChange", {
        detail: { index }
      }));
      window.dispatchEvent(new CustomEvent("updateArrows",{
        detail: { index }
      }));
    });
  });
}

export function contactMeSection(box) {
    
  box.innerHTML = `
    <h2>Contact Me</h2>
    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 1rem; padding-bottom: 2rem" />
    <div class="contact-icons" style="display: flex; justify-content: center; gap: 3rem; margin-bottom: 2rem;">
      <div style="text-align: center;">
        <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" style="color: white;">
          <i class="devicon-linkedin-plain" style="font-size: 2.5rem;"></i>
        </a>
        <p style="margin-top: 0.5rem;">LinkedIn</p>
      </div>
      <div style="text-align: center;">
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" style="color: white;">
          <i class="devicon-github-original" style="font-size: 2.5rem;"></i>
        </a>
        <p style="margin-top: 0.5rem;">GitHub</p>
      </div>
      <div style="text-align: center;">
        <a href="#" target="_blank" rel="noopener noreferrer" style="color: white;">
          <i class="fa-solid fa-file-pdf" style="font-size: 2.5rem;"></i>
        </a>
        <p style="margin-top: 0.5rem;">Resume</p>
      </div>
    </div>

    <hr style="border: none; border-top: 1px solid #ccc; margin: 2rem 0;" />

    <form id="contactForm" style="display: flex; flex-direction: column; gap: 1rem;">
      <input type="text" id="name" name="name" placeholder="Your Name" required
        style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;" />
      
      <input type="email" id="email" name="email" placeholder="Your Email" required
        style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;" />
      
      <textarea id="message" name="message" placeholder="Your Message" rows="5" required
        style="padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; resize: vertical;"></textarea>
      
      <button type="submit"
        style="padding: 0.75rem; border-radius: 8px; background-color: #222; color: #fff; font-size: 1rem; border: none; cursor: pointer;">
        Send Message
      </button>
    </form>
  `;
}

export function SkillSetList(box) {
  box.innerHTML = `
    <h2>Skill Sets</h2>
    <hr style="border: none; border-top: 1px solid #ccc; margin: 1rem 0;" />
    <h3 style="padding: 0.5rem 0 1rem 0;">Programming Languages</h3>
    <ul style="list-style: none; padding: 0;">
      ${languages
        .map(
          lang => `
          <li style="display: flex; align-items: center; margin-bottom: 1rem;">
            <i class="${lang.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
            <span style="font-size: 1.1rem;">${lang.name}</span>
          </li>`
        )
        .join('')}
    </ul>
    <h3 style="padding: 0.5rem 0 1rem 0;">Development Platforms</h3>
    <ul style="list-style: none; padding: 0;">
      ${platforms
        .map(
          platform => `
            <li style="display: flex; align-items: center; margin-bottom: 1rem;">
              <i class="${platform.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
              <span style="font-size: 1.1rem;">${platform.name}</span>
            </li>
          `
        )
        .join('')}
    </ul>
    <h3 style="padding: 0.5rem 0 1rem 0;">General Robotics</h3>
    <ul style="list-style: none; padding: 0;">
      ${roboticsItems
        .map(
          item => `
            <li style="display: flex; align-items: center; margin-bottom: 1rem;">
              <i class="${item.icon}" style="font-size: 2rem; color: white; margin-right: 1rem;"></i>
              <span style="font-size: 1.1rem;">${item.name}</span>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}