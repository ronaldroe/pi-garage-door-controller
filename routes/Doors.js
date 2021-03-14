const express = require('express');
const router = express.Router();
const fs = require('fs');

const settings = JSON.parse(fs.readFileSync(`${require.main.path}/settings.json`));

const Door = require.main.require('./src/server/DoorBase');
const Store = require.main.require(`./src/server/${!settings.remote_data_url ? 'StaticLocalStore' : 'StaticRemoteStore'}`);

let store = new Store();

// Endpoint to get the doors
router.get('/doors', (req, res) => {

  let doors = Door.getAllDoors(store);
  doors.statuses = new Door(store, 0).statuses;

  res.send(doors);
});

module.exports = router;