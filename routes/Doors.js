const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ObjId = mongoose.Types.ObjectId;

const Doors = require('../models/doorState');

// Endpoint to get the doors
router.get('/doors', (req, res) => {

});

router.get('/', (req, res) => {
  res.sendFile(__dirname + '../views/index.html');
});