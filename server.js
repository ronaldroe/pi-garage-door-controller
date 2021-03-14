const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

let env = process.env;

const PORT = env.PORT || 3000;
const settings = JSON.parse(fs.readFileSync(`${require.main.path}/settings.json`));

const DIST = path.join(require.main.path, 'dist');
const WEB_INDEX = path.join(DIST, 'index.html');

app.use(express.static(require.main.path + '/dist'));
app.use(express.static(path.join(require.main.path, 'public')));
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Reply to options requests
app.options('/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.get('/', (req, res) => {
  res.sendFile(WEB_INDEX);
});


// Main page with status of all doors and controls
const doors = require('./routes/Doors');
app.use('/api/v1', doors);