const { client } = require("../utilites");

const bcrypt = require('bcrypt');



const createUser = async (request, response) => {
    const { name, email, password } = request.body;
    const joined = new Date();
    const hash = bcrypt.hashSync(password, 10);
    await client.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
        'INSERT INTO users (name, email, joined) VALUES ($1, $2, $3) RETURNING *', // inserting in to users table
        [name, email, joined]
      );
      const userId = result.rows[0].id;
      const userEntries = result.rows[0].entries;
  
      const loginTable = await client.query(
        'INSERT INTO login (name, hash, email, id) VALUES ($1, $2, $3, $4) RETURNING email', // inserting in to login  table
        [name, hash, email, userId]
      );
      // Get the last rank from the user_rank table
  const  getLastRank  = await client.query(
    'SELECT rank FROM user_rank ORDER BY rank DESC LIMIT 1'
      );
      const lastRank = getLastRank.rows[0].rank
      const userRank = getLastRank.rows.length ? lastRank + 1 : 1
      const entriesTable = await client.query(
        'INSERT INTO user_rank (id, email, entries, rank) VALUES ($1, $2, $3, $4)',[ userId, email, userEntries, userRank]
      ) 
      await client.query('COMMIT');
      const responseData = {
        message: 'User registered successfully',
        success: true,
        rank: lastRank,
        data: {...result.rows[0], rank: lastRank},
      };
      response.status(201).json(responseData);
    } catch (error) {
      await client.query('ROLLBACK');
      response.status(400).send(error.message);
      throw error;
    } finally {
      await client.end();
    }
};
  
module.exports = {
    createUser
}