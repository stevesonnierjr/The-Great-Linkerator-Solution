const path = require('path');

const { sync } = require('./data_layer/index');

const PORT = process.env.PORT || 3001;
const FORCE = process.env.FORCE || false;
const express = require('express');
const server = express();

server.use('/api', require('./api'));

server.use(express.static(path.join(__dirname, 'build')));

server.get('/', (req, res) => {
  res.send('yeet');
});

const startServer = new Promise((resolve) => {
  server.listen(PORT, () => {
    resolve();
  });
});

sync(FORCE)
  .then(startServer)
  .catch((error) => {
    console.error(`YIKES: ${error.toString()}`);
  });
