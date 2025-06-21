import { offsets } from "../fixedValues/offsets";

function isDescendantOf(object, potentialAncestor) {
  let current = object;
  while (current) {
    if (current === potentialAncestor) return true;
    current = current.parent;
  }
  return false;
}

// export const planetRegistry = [
//   { name: 'sun', object: sun, offset: offsets[0], match: (o) => o.material === sunMat },
//   { name: 'mercury', object: mercury, offset: offsets[1], match: (o) => mercury.planet && isDescendantOf(o, mercury.planet) },
//   { name: 'venus', object: venus, offset: offsets[2], match: (o) => venus.planet && isDescendantOf(o, venus.planet) },
//   { name: 'earth', object: earth, offset: offsets[3], match: (o) => o.material === earth.planet?.material },
//   { name: 'mars', object: mars, offset: offsets[4], match: (o) => mars.planet && isDescendantOf(o, mars.planet) },
//   { name: 'jupiter', object: jupiter, offset: offsets[5], match: (o) => jupiter.planet && isDescendantOf(o, jupiter.planet) },
//   { name: 'saturn', object: saturn, offset: offsets[6], match: (o) => saturn.planet && isDescendantOf(o, saturn.planet) }
// ];

export function createPlanetRegistry(sun,planets){
    const registry = [];
    
    registry.push({ name: 'sun', object: sun, offset: offsets[0], match: (o) => o.material === sun.material });
    
    Object.keys(planets).forEach((key, index) => {
        const planet = planets[key];
        if (planet && planet.planet) {
        registry.push({
            index: index,
            name: key,
            object: planet,
            offset: offsets[index + 1],
            match: (o) => isDescendantOf(o, planet.planet)
        });
        }
    });
    
    return registry;
}