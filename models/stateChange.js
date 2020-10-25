const mongoose = require('mongoose');

const stateChangeSchema = mongoose.Schema({
  door: Number,
  beginState: Number, // 0=unknown, 1=down, 2=up, 3=moving
  endState: Number, // Same as above
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

let StateChange = module.exports = mongoose.model('StateChange', stateChangeSchema);