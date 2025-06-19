import {createPlanet} from './meshPlanet.js';
import { createglbPlanet } from './glbPlanet.js';
import {texturePaths,glbModelPaths} from '../fixedValues/paths.js';






export async function initAllPlanets(scene,loadTexture) {
    const mercury = await createglbPlanet("Mercury",glbModelPaths.mercury,40,0.20);
    mercury.planet.rotation.x = -90 * Math.PI / 180;
    
    
    //const mercury = new createPlanet('Mercury', 5, 40, 0, mercuryTexture, mercuryBump);
    //const venus = new createPlanet('Venus', 6.1, 65, 0, basketballTexture);
    const venus = await createglbPlanet("Venus",glbModelPaths.venus,65,6.1);
    const earth = new createPlanet(loadTexture,'Earth', 6.4, 90, 0, texturePaths.earthTexture, null, null);
    //const mars = new createPlanet('Mars', 7, 115, 0, thaiFlagTexture, marsBump);
    const mars = await createglbPlanet("Mars",glbModelPaths.mars,115,4);
    // Load Mars moons

    const jupiter = await createglbPlanet("Jupiter",glbModelPaths.jupiter,170,15);

    console.log(jupiter.planet);
    console.log("jupiter meshes: ",jupiter.meshes);
    //jupiter.planet.rotation.z = 45 * Math.PI / 180;
    
    //const jupiter = new createPlanet('Jupiter', 69/4, 170, 0, poolBallTexture, null, null, null);
    
    //const saturn = new createPlanet('Saturn', 58/4, 240, 0, saturnTexture, null,null);

    const saturn = await createglbPlanet("Saturn",glbModelPaths.saturn,260,1);


    const planets = {
        mercury: mercury,
        venus: venus,
        earth: earth,
        mars: mars,
        jupiter: jupiter,
        saturn: saturn
    };
    Object.values(planets).forEach(planet => {
        scene.add(planet.planet3d);
    });

    // Hide all planet meshes initially
    Object.values(planets).forEach(planet => {
        planet.planet3d.visible = false;
    });

    return planets;
    
}
