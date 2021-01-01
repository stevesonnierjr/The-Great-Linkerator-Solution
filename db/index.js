const client = require("./client");
const sync = require("./sync");

async function createLink({ links, comment }) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      INSERT INTO links(link, comment)
      VALUES ($1, $2)
      ON CONFLICT (link) DO NOTHING
      returning *;
    `,
      [links, comment]
    );

    console.log(link);
    return link;
  } catch (error) {
    throw error;
  }
}

/**
 * testing purposes
 */
async function createInitialLinks() {
  try {
    await createLink({ links: "www.google.com", comment: "go to google" });
    await createLink({ links: "www.youtube.com", comment: "go to youtube" });
  } catch (error) {
    throw error;
  }
}

async function getAllLinks() {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM links;
    `);

    return { rows };
  } catch (error) {
    throw error;
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(
      `
      INSERT INTO post_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
    `,
      [linkId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToLinks(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map((tag) =>
      createLinkTag(linkId, tag.id)
    );

    await Promise.all(createLinkTagPromises);

    return await getPostById(linkId);
  } catch (error) {
    throw error;
  }
}

async function getLinksByTagName(tagName) {
  try {
    const { rows: linkIds } = await client.query(
      `
      SELECT links.id
      FROM links
      JOIN link_tags ON links.id=link_tags."linkId"
      JOIN tags ON tags.id=link_tags."tagId"
      WHERE tags.name=$1;
    `,
      [tagName]
    );

    return await Promise.all(linkIds.map((post) => getLinkById(link.id)));
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM tags;
    `);

    return { rows };
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("creating initial links...");
    await sync();
    await createInitialLinks();
    console.log("done!");
  } catch (error) {
    console.log("error creating links!");
    throw error;
  }
}

testDB();

module.exports = {
  sync,
  createLink,
  getAllTags,
  getAllLinks,
  getLinksByTagName,
};
