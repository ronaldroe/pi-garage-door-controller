const mongoose = require('mongoose');

const doorStateSchema = mongoose.Schema({
  doorName: String,
  pins: {
    input: Number,
    output: Number
  },
  state: Number, // 0=unknown, 1=moving, 2=down, 3=up
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

let DoorState = module.exports = mongoose.model('DoorState', doorStateSchema);