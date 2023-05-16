// require('dotenv').config();
// const bcrypt = require('bcrypt');
// const { Pool, Client } = require('pg');
// const { makeClarifyRequest } = require('./utilites');
// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
// });

// const client = new Client({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE,
// });

// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

// const getUserById = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     if (results.rows.length) response.status(200).json(results.rows[0]);
//     else response.status(404).json('not foound');
//   });
// };

// const signIn = async (request, response) => {
//   const { email, password } = request.body;
//   // console.log(request.body)
//   const client = await pool.connect();
//   console.time('start');
//   try {
//     await client.query('BEGIN');
//     const result = await client.query('SELECT * FROM login WHERE email = $1 ', [email]);
//     // console.log(result)
//     if (result.rows.length) {
//       const hash = result.rows[0].hash;

//       const match = bcrypt.compareSync(password, hash); //compare hash
//       if (match) {
//         const userEmail = result.rows[0].email;
//         const userData = await client.query('SELECT * FROM users WHERE email = $1 ', [userEmail]); // geting user from users
//         const userRank = await client.query('SELECT * FROM user_rank WHERE email = $1 ', [userEmail]); // geting rank from user_rank
//         const user = userData.rows[0];
//         await client.query('COMMIT');
//         const responseData = {
//           message: 'Authentication successful',
//           success: true,
//           data: {...user, rank: userRank.rows[0].rank },
//         };
//         response.status(200).json(responseData);
//       } else {
//         await client.query('COMMIT');
//         response.status(401).json({
//           success: false,
//           message: 'Invalid email or password',
//         });
//       }
//     } 
//   } catch (error) {
//     await client.query('ROLLBACK');
//     response.status(400).send(error.message);
//     throw error;
//   } finally {
//     await client.end();
//     console.timeEnd('start');
//   }
// };

// const createUser = async (request, response) => {
//   const { name, email, password } = request.body;
//   const joined = new Date();
//   const hash = bcrypt.hashSync(password, 10);
//   await client.connect();
//   try {
//     await client.query('BEGIN');
//     const result = await client.query(
//       'INSERT INTO users (name, email, joined) VALUES ($1, $2, $3) RETURNING *', // inserting in to users table
//       [name, email, joined]
//     );
//     const userId = result.rows[0].id;
//     const userEntries = result.rows[0].entries;

//     const loginTable = await client.query(
//       'INSERT INTO login (name, hash, email, id) VALUES ($1, $2, $3, $4) RETURNING email', // inserting in to login  table
//       [name, hash, email, userId]
//     );
//     // Get the last rank from the user_rank table
// const  getLastRank  = await client.query(
//   'SELECT rank FROM user_rank ORDER BY rank DESC LIMIT 1'
//     );
//     const lastRank = getLastRank.rows[0].rank
//     const userRank = getLastRank.rows.length ? lastRank + 1 : 1
//     const entriesTable = await client.query(
//       'INSERT INTO user_rank (id, email, entries, rank) VALUES ($1, $2, $3, $4)',[ userId, email, userEntries, userRank]
//     ) 
//     await client.query('COMMIT');
//     const responseData = {
//       message: 'User registered successfully',
//       success: true,
//       rank: lastRank,
//       data: {...result.rows[0], rank: lastRank},
//     };
//     response.status(201).json(responseData);
//   } catch (error) {
//     await client.query('ROLLBACK');
//     response.status(400).send(error.message);
//     throw error;
//   } finally {
//     await client.end();
//   }
// };

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   const { name, email } = request.body;

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`);
//     }
//   );
// };
// const updateEntries = async (request, response) => {
//   const { id, imageUrl } = request.body;

//   const client = await pool.connect();
//   const boundingBoxes = await makeClarifyRequest(imageUrl)
//   try {
//     await client.query('BEGIN');
//     const result = await client.query('UPDATE users SET entries = entries + 1 WHERE id = $1 RETURNING *', [id]);
//     // console.log(result)
//     if (result.rows.length) {
//       const {id, entries:userEntry} = result.rows[0]
//       await client.query('UPDATE user_rank Set entries= $1 WHERE id = $2', [userEntry, id] )
//       await client.query('COMMIT');
//       const entries = result.rows[0].entries
//       const data = {
//         message: 'entries updated successfully',
//         success: true,
//         data: { entries, boundingBoxes  }
//       };

//       response.status(200).json(data);
//     } else {
//       await client.query('COMMIT');
//       const message = 'no data found'
//       response.status(401).send(message)
//     }

//   } catch (error) {
//     await client.query('ROLLBACK');
//     response.status(400).send(error.message);
//     throw error;
//   } finally {
//     await client.end();
//     console.timeEnd('start')
//   }

//   // pool.query(
//   //   'UPDATE users SET entries = entries + 1 WHERE id = $1 RETURNING *',
//   //   [id],
//   //   (error, results) => {
//   //     if (error) { 
//   //       throw error;
//   //     }

//   //     const data = {
//   //       message: 'entries updated successfully',
//   //       success: true,
//   //       data: results.rows[0].entries,
//   //     };

//   //     response.status(200).json(data);
//   //   }
//   // );
// };

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

// module.exports = {
//   getUsers,
//   getUserById,
//   signIn,
//   createUser,
//   updateEntries,
//   updateUser,
//   deleteUser,
// };
