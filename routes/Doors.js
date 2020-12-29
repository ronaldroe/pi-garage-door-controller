const express = require('express');
const router = express.Router();

const DoorBase = require(`${__dirname}/../src/DoorBase`);

// Endpoint to get the doors
router.get('/doors', (req, res) => {

});

router.get('/', (req, res) => {
  res.sendFile(__dirname + '../views/index.html');
});