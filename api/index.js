const express = require("express");
const apiRouter = express.Router();

const linksRouter = require("./links");
apiRouter.use("/links", linksRouter);

const tagsRouter = require("./tags");
apiRouter.use("/tags", tagsRouter);

module.exports = apiRouter;
