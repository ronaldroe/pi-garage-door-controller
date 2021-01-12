#!/usr/bin/env node
const Door = require('./src/DoorBase');
const Store = require('./src/StaticLocalStore');
const { sleep } = require('./src/helpers');

let store = new Store();

// function to create door
const createDoor = doorInput => {
  let oldState = store.getState();

  oldState.push(doorInput);

  store.setState(oldState);
}

// function to get status of door

// function to move door

// function to put door up

// function to put door down

let door = new Door(store, 0);

(async () => {
  await door.move().catch(e => console.log(e.message));
})();