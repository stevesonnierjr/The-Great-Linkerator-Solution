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
      RETURNING *;
    `,
      [links, comment]
    );

    console.log(link);
    return link;
  } catch (error) {
    throw error;
  }
}

async function updateLinks(id, fields = {}) {
  const { comment } = fields;
  console.log("this is id", id);
  console.log("this is fields", fields);
  const setString = Object.keys(fields)
    .map((key, index) => {
      console.log("key: ", key);
      console.log("index: ", index);
      return `"${key}"=$${index + 1}`;
    })
    .join(", ");
  console.log("this is fields keys: ", setString);

  /*console.log('THIS IS SETSTRING', setString);
  if (setString.length === 0) {
    return;
  }*/

  try {
    const {
      rows: [link],
    } = await client.query(
      `
      UPDATE links
      SET ${setString}
      WHERE "id"=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    console.log("THIS IS LINK", link);
    return link;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * testing purposes
 */
async function createInitialLinks() {
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
