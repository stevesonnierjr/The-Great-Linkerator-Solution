const express = require("express");
const linksRouter = express.Router();

const { createLink, getAllLinks, updateLinks } = require("../db/index");
const { request } = require("express");

linksRouter.use((req, res, next) => {
  console.log("a request is being made to links");
  next();
});

linksRouter.get("/", async (req, res, next) => {
  const links = await getAllLinks();
  res.send(links.rows);
  next();
});

linksRouter.post("/", async (req, res, next) => {
  const { link, comment } = req.body;
  const linkData = {};

  try {
    linkData.links = link;
    linkData.comment = comment;

    const newlink = await createLink(linkData);
    if (newlink) {
      res.send(newlink);
    } else {
      next({
        name: "PostCreationError",
        message: "There was an error creating your post. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

linksRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { comment, clickcount } = req.body;
  const updateFields = {};

  if (clickcount) {
    updateFields.clickcount = clickcount;
  }
  if (comment) {
    updateFields.comment = comment;
  }

  try {
    const updatedLink = await updateLinks(id, updateFields);
    res.send(updatedLink);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = linksRouter;
