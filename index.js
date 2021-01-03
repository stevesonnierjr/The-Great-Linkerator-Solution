const express = require("express");
const path = require("path");

const { sync } = require("./db/index");

const PORT = process.env.PORT || 3001;
const FORCE = process.env.FORCE || false;

const app = express();


const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));


// const apiRouter = require('./api');
// app.use('/api', apiRouter);
app.use(express.json());
app.use("/api", require("./api/index"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const startServer = new Promise((resolve) => {
  app.listen(PORT, () => {
    console.log('server is up!');
    resolve();
  });
});

sync(FORCE)
  .then(startServer)
  .catch((error) => {
    console.error(`YIKES: ${error.toString()}`);
  });
