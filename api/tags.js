const express = require("express");
tagsRouter = express.Router();

const { getAllTags, getLinksByTagName } = require("../db/index");

tagsRouter.use((req, res, next) => {
  console.log("a request is being made to tags");
  next();
});

tagsRouter.get("/", async (req, res, next) => {
  try {
    const tags = await getAllTags();
    res.send({
      tags,
    });
  } catch (error) {
    next(error);
  }
});

tagsRouter.get("/:tagName/links", async (req, res) => {
  const { tagName } = req.params;
  try {
    const links = await getLinksByTagName(tagName);
    res.send({ links });
  } catch (error) {
    console.error(error);
  }
});

module.exports = tagsRouter;
