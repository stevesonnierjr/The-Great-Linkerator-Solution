const client = require("./client");
const sync = require("./sync");

async function createLink({
  links,
  comment
}) {
  try {
    const {rows: [link]} = await client.query(`
      INSERT INTO links(link, comment)
      VALUES ($1, $2)
      ON CONFLICT (link) DO NOTHING
      returning *;
    `, [links, comment]);

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
    await createLink({links: 'www.google.com', comment: 'go to google'});
    await createLink({links: 'www.youtube.com', comment: 'go to youtube'});
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("creating initial links...");
    await sync();
    await createInitialLinks();
    console.log("done!")
  } catch (error) {
    console.log("error creating links!");
    throw error;
  }
}

testDB();

module.exports = {
  sync,
  createLink,
};
