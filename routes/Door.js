const express = require('express');
const router = express.Router();
const fs = require('fs');

const settings = JSON.parse(fs.readFileSync(`${__dirname}/../settings.json`));

const Door = require(`${__dirname}/../src/DoorBase`);
const Store = require(`${__dirname}/../src/${!settings.remote_data_url ? 'StaticLocalStore' : 'StaticRemoteStore'}`);

const store = new Store();

// Get door by id
router.get('/id/:id', (req, res) => { res.send(new Door(store, parseInt(req.params.id, 10))); });

// Get door by name
router.get('/name/:name', (req, res) => {
  res.send(new Door(store, store.getDoorByName(req.params.name).id));
});

// Update door by id
router.put('/id/:id', (req, res) => {

});

// Create door by id
router.post('/', (req, res) => {
  try {
    let newDoor = {
      id: store.getState().doors.length,
      ...req.body
    }

    res.send(newDoor);
  } catch(e) {
    res.status(500).send({error: e.message});
    store.addLog(`Could not add door. Error: ${e.stack}`);
  }
});

module.exports = router;