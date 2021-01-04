const express = require('express');
const linksRouter = express.Router();

const { createLink, getAllLinks, updateLinks } = require('../db/index');
const { request } = require('express');

linksRouter.use((req, res, next) => {
  console.log('a request is being made to links');
  next();
});

linksRouter.get('/', async (req, res, next) => {
  const links = await getAllLinks();
  res.send(links.rows);
  next();
});

linksRouter.post('/', async (req, res, next) => {
  const { links, comment } = req.body;
  const linkData = {};

  try {
    linkData.links = links;
    linkData.comment = comment;

    const newlink = await createLink(linkData);
    if (newlink) {
      res.send(newlink);
    } else {
      next({
        name: 'PostCreationError',
        message: 'There was an error creating your post. Please try again.',
      });
    }
  } catch (error) {
    next(error);
  }
});

linksRouter.patch('/:id', async (req, res, next) => {
  console.log('THIS IS REQUEST PARAMS', req.params);
  const { id } = req.params;
  const { comment, clickCount } = req.body;
  const updateFields = {};
  console.log('this is a log for id', id);
  if (clickCount) {
    updateFields.clickCount = clickCount;
  }
  if (comment) {
    updateFields.comment = comment;
  }
  console.log('this is updated field', updateFields);
  try {
    const updatedLink = await updateLinks(id, updateFields);
    console.log('THIS IS UPDATEDLINK', updatedLink);
    res.send({ id: updatedLink });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = linksRouter;
