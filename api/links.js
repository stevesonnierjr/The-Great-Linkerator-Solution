const express = require('express');
const linksRouter = express.Router();

const { createLink, getAllLinks } = require('../db/index');

linksRouter.use((req, res, next) => {
  console.log('a request is being made to links');
  next();
});

linksRouter.get('/', async (req, res) => {
  const links = await getAllLinks();
  res.send({
    links,
  });
});

/*linksRouter.post('/', async (req, res, next) => {
  const { links, comment = '' } = req.body;

  const tagArr = tags.trim().split(/\s+/);
  const linksData = {};

  if (tagArr.length) {
    linksData.tags = tagArr;
  }

  try {
    linksData.links = links;
    linksData.comment = comment;

    const link = await createLink(linksData);
    console.log(link);
    if (link) {
      res.send(link);
    } else {
      next({
        name: 'LinkCreationError',
        message: 'There was an error creating your link. Please try again.',
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});*/

module.exports = linksRouter;
