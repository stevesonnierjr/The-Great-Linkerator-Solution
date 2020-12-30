const express = require('express');
const path = require('path');

const { sync } = require('./db/index');

const PORT = process.env.PORT || 3001;
const FORCE = process.env.FORCE || false;

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('yeet');
});

const startServer = new Promise((resolve) => {
  app.listen(PORT, () => {
    resolve();
  });
});

sync(FORCE)
  .then(startServer)
  .catch((error) => {
    console.error(`YIKES: ${error.toString()}`);
  });
