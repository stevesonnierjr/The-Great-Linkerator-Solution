const express = require("express");
const linksRouter = express.Router();


const { createLink, getAllLinks, updateLink } = require('../db/index');
const { request } = require('express');




linksRouter.use((req, res, next) => {
  console.log("a request is being made to links");
  next();
});

linksRouter.get("/", async (req, res) => {
  const links = await getAllLinks();
  res.send({
    links,
  });
});

linksRouter.post('/', async (req, res, next) => {
  const { links, comment = '' } = req.body;
  const linkData= {};

  try {
    linkData.links = links;
    linkData.comment = comment;

    const link = await createLink();
    res.send(link);
  } catch (error) {
    next(error);
  }
});

linksRouter.patch('/:id', async (req, res, next) => {
  const { linkId } = req.params;
  const { comment, clickCount } = req.body;

  const updateFields = {};

  updateFields.clickCount = clickCount++;
  if (comment) {
    updateFields.comment = comment;
  }

  try {
    const updatedLink = await updateLink(linkId, updateFields);
    res.send({ link: updatedLink });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = linksRouter;
