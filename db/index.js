const client = require("./client");
const sync = require("./sync");

async function createLink({ links, comment }) {
  console.log("creating new link...");
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      INSERT INTO links(link, comment)
      VALUES ($1, $2)
      ON CONFLICT (link) DO NOTHING
      RETURNING *;
    `,
      [links, comment]
    );

    console.log("new link created!", link);
    return link;
  } catch (error) {
    console.log("error creating new link!", error);
    throw error;
  }
}

async function updateLinks(id, fields = {}) {
  console.log("updating link...");
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(", ");

  try {
    const {
      rows: [link],
    } = await client.query(
      `
      UPDATE links
      SET ${setString}
      WHERE "id"=$1
      RETURNING *;
    `,
      [id, ...Object.values(fields)]
    );
    console.log("link updated!", link);
    return link;
  } catch (error) {
    console.log("Error updating link!", error);
    throw error;
  }
}

async function getAllLinks() {
  console.log("getting all links...");
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM links;
    `);
    console.log("success!", { rows });
    return { rows };
  } catch (error) {
    console.log("Error getting links!", error);
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

    return await getLinkById(linkId);
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

async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const valuesStringInsert = tagList
    .map((_, index) => `$${index + 1}`)
    .join("), (");

  const valuesStringSelect = tagList
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  try {
    // insert all, ignoring duplicates
    await client.query(
      `
      INSERT INTO tags(name)
      VALUES (${valuesStringInsert})
      ON CONFLICT (name) DO NOTHING;
    `,
      tagList
    );

    // grab all and return
    const { rows } = await client.query(
      `
      SELECT * FROM tags
      WHERE name
      IN (${valuesStringSelect});
    `,
      tagList
    );

    return rows;
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

/**
 * testing purposes
 */
async function createInitialLinks() {
  console.log("creating initial links...");
  try {
    await createLink({
      links: "https://www.google.com/",
      comment: "Search the Internet!",
    });
    await createLink({
      links: "https://www.youtube.com/",
      comment: "Watch everything!",
    });
    await createLink({
      links: "https://www.amazon.com/",
      comment: "Shop the internet!",
    });
  } catch (error) {
    throw error;
  }
  console.log("initial links created.");
  console.log("if above values are undefined. then links already exist");
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
  updateLinks,
};
