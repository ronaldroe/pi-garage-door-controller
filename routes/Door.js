const express = require('express');
const router = express.Router();
const fs = require('fs');

const settings = JSON.parse(fs.readFileSync(`${__dirname}/../settings.json`));

const Door = require(`${__dirname}/../src/DoorBase`);
const Store = require(`${__dirname}/../src/${!settings.remote_data_url ? 'StaticLocalStore' : 'StaticRemoteStore'}`);

// Get door by id
router.get('/id/:id', (req, res) => {
  
});

// Get door by name
router.get('/name/:name', (req, res) => {

});

// Create door
router.post('/', (req, res) => {

});

// Update door by id
router.put('/id/:id', (req, res) => {

});

module.exports = router;