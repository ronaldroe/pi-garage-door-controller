const mongoose = require('mongoose');

const doorStateSchema = mongoose.Schema({
  doorName: String,
  pins: {
    input: Number,
    output: Number
  },
  state: {type: Number, default: 0}, // 0=unknown, 1=down, 2=up, 3=moving
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

let DoorState = module.exports = mongoose.model('DoorState', doorStateSchema);