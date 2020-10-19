const mongoose = require('mongoose');

const stateChangeSchema = mongoose.Schema({
  door: Number,
  beginState: Number, // 0=unknown, 1=moving, 2=down, 3=up
  endState: Number, // Same as above
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

let StateChange = module.exports = mongoose.model('StateChange', stateChangeSchema);