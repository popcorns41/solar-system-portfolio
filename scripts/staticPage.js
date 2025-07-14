import {planetData} from './mediaHandler/planetInfoData.js';
import {updateInfoBoxes} from './dynamicInfoBox.js';

export function generateStaticPage() {
    const staticSection = document.getElementById("staticPage");
    const n = planetData.length-1;

    for (let i = n; i > 0; i--) {
        const infoSection = document.createElement('div');
        infoSection.id = `infoSection-${i}`;
        infoSection.className = `static-infoSection`;

        const leftBox = document.createElement('div');
        leftBox.className = 'static-info-box infBoxLeft';
        leftBox.id = `infoBoxLeft-${i}`;

        const rightBox = document.createElement('div');
        rightBox.className = 'static-info-box infBoxRight';
        rightBox.id = `infoBoxRight-${i}`;

        infoSection.appendChild(leftBox);
        infoSection.appendChild(rightBox);

        staticSection.appendChild(infoSection);
    }

        // contact me

    const infoSection = document.createElement('div');
    infoSection.id = `infoSection-${0}`;
    infoSection.className = `static-infoSection`;
    const leftBox = document.createElement('div');
    leftBox.className = 'static-info-box infBoxLeft';
    leftBox.id = `infoBoxLeft-0`;

    infoSection.appendChild(leftBox);
    staticSection.appendChild(infoSection);
}

export function populateStaticPage(){
    const n = planetData.length-1;
    for (let i = n; i > 0; i--){
        const leftBox = document.getElementById(`infoBoxLeft-${i}`);
        const rightBox = document.getElementById(`infoBoxRight-${i}`);
        updateInfoBoxes(i,leftBox,rightBox);
    }
    const leftBox = document.getElementById(`infoBoxLeft-0`);
    updateInfoBoxes(0,leftBox);
}