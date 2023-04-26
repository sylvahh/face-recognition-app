const { pool } = require("../utilites");


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length) response.status(200).json(results.rows[0]);
      else response.status(404).json('not foound');
    });
};
  
module.exports = {
    getUsers,
    getUserById
}