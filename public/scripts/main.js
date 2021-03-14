import { doorImageSources } from './helpers.js';
import {
  createDoorStatusElements
} from './functions.js';

let doors, doorElements, doorImages;

const init = async () => {
  doors = await fetch(`${window.location.protocol}//${location.hostname}:${location.port}/doors`).then(res => res.json());

  createDoorStatusElements(doors, doorImageSources);
};

(async () => {
  await init();
})();