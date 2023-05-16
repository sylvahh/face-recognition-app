const { pool } = require("../utilites");
const bcrypt = require('bcrypt');



const signIn = async (request, response) => {
    const { email, password } = request.body;
    // console.log(request.body)
    const client = await pool.connect();
    console.time('start');
    try {
      await client.query('BEGIN');
      const result = await client.query('SELECT * FROM login WHERE email = $1 ', [email]);
      // console.log(result)
      if (result.rows.length) {
        const hash = result.rows[0].hash;
  
        const match = bcrypt.compareSync(password, hash); //compare hash
        if (match) {
          const userEmail = result.rows[0].email;
          const userData = await client.query('SELECT * FROM users WHERE email = $1 ', [userEmail]); // geting user from users
          const userRank = await client.query('SELECT * FROM user_rank WHERE email = $1 ', [userEmail]); // geting rank from user_rank
          const user = userData.rows[0];
          await client.query('COMMIT');
          const responseData = {
            message: 'Authentication successful',
            success: true,
            data: {...user, rank: userRank.rows[0].rank },
          };
          response.status(200).json(responseData);
        } else {
          await client.query('COMMIT');
          response.status(401).json({
            success: false,
            message: 'Invalid email or password',
          });
        }
      } 
    } catch (error) {
      await client.query('ROLLBACK');
      response.status(400).send(error.message);
      throw error;
    } finally {
      await client.end();
      console.timeEnd('start');
    }
};
  
module.exports = {
    signIn
}