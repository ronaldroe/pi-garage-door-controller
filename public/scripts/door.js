import { getUrlParameter } from './functions.js';

let door;

const init = async () => {
  if(typeof door === 'undefined') location.href = location.hostname;

  door = await fetch(`${window.location.protocol}//${location.hostname}/door/id/${getUrlParameter('id')}`).then(res => res.json());

  // Here's where we do cool shit with the door info
}