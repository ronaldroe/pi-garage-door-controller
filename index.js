const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let db = mongoose.connect('mongodb://localhost/flower_moxie', {
  useMongoClient: true
});
db.once('open', () => console.log('Connected to DB'));
db.on('error', err => { if (err) console.log(err) });
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

let DoorState = require('./models/doorState');
let StateChange = require('./models/stateChange');

// Reply to options requests
app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

// Main page with status of all doors and controls
const doors = require('./routes/Doors');
app.use('/', );

// Individual page with door status and controls
const door = require('./routes/Door');
app.use('/door', );

// Get door current status
const status = require('./routes/Status');
app.use('/status', );

// Move door from current state
const move = require('./routes/Move');
app.use('/move', );

// Move door if down, return state if already up
const up = require('./routes/Up');
app.use('/up', );

// Move door if up, return state if already down
const down = require('./routes/Down');
app.use('/down', );

