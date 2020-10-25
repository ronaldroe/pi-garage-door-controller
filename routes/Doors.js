const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ObjId = mongoose.Types.ObjectId;

const Doors = require('../models/doorState');

// Endpoint to get the doors
router.get('/doors', (req, res) => {

  let output = [];

  Doors.find({})
  .then(data => output = data)
  .catch(err => res.send(`There was an error getting the doors: ${err}`));

  res.send(output);

});

router.get('/', (req, res) => {
  res.sendFile(__dirname + '../views/index.html');
});