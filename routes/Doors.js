const express = require('express');
const router = express.Router();
const fs = require('fs');

const settings = JSON.parse(fs.readFileSync(`${__dirname}/../settings.json`));

const Door = require(`${__dirname}/../src/DoorBase`);
const Store = require(`${__dirname}/../src/${!settings.remote_data_url ? 'StaticLocalStore' : 'StaticRemoteStore'}`);

let store = new Store();

// Endpoint to get the doors
router.get('/doors', (req, res) => {
 res.send(Door.getAllDoors());
});

router.get('/', (req, res) => {
  res.sendFile(__dirname + '../views/index.html');
});