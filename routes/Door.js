const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ObjId = mongoose.Types.ObjectId;

const Door = require('../models/doorState.js');
const StateLog = require('../models/stateChange.js');

// Get door by id
router.get('/id/:id', (req, res) => {

  Door.findOne({_id: ObjId(req.params.id)})
  .then(door => {
    if(data === null) return Promise.reject('Door ID was not found.');

    res.send({...data});

    return data;
  })
  .catch(err => res.send(`There was an error pulling the door\'s data: ${err.message}`));

});

// Get door by name
router.get('/name/:name', (req, res) => {

  Door.findOne({name: req.params.name})
  .then(door => {
    if(data === null) return Promise.reject('Door name was not found.');

    res.send({...data});

    return data;
  })
  .catch(err => res.send(`There was an error pulling the door\'s data: ${err.message}`));

});

// Create door
router.post('/', (req, res) => {

  // TODO: Get door state from the pi

  let newDoor = new Door({
    doorName: req.body.name,
    pins: {
      input: req.body.input,
      output: req.body.output
    },
    currentState: 0
  });

  newDoor.save((err, data) => {

    if(err){
      res.send({status: 'fail', data: `Save failed: ${err.message}`});
      return data;
    }

    res.send({status: 'success', data: data});

    return data;

  });



});

// Update door by id
router.put('/id/:id', (req, res) => {

  Door.findOne({_id: ObjId(req.params.id)});
  .then(data => {

    data = {
      ...data,
      ...req.body
    };

    data.save((err, data) => {

      if(err){
        res.send({status: 'fail', data: `Save failed: ${err.message}`});
        return data;
      }
  
      res.send({status: 'success', data: data});
  
      return data;

    });

  });

});