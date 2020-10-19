const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  passcode: Number
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

let User = module.exports = mongoose.model('User', userSchema);