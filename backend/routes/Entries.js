const { pool, makeClarifyRequest} = require("../utilites");


const updateEntries = async (request, response) => {
    const { id, imageUrl } = request.body;
  
    const client = await pool.connect();
    const boundingBoxes = await makeClarifyRequest(imageUrl)
    try {
      await client.query('BEGIN');
      const result = await client.query('UPDATE users SET entries = entries + 1 WHERE id = $1 RETURNING *', [id]);
      // console.log(result)
      if (result.rows.length) {
        const {id, entries:userEntry} = result.rows[0]
        await client.query('UPDATE user_rank Set entries= $1 WHERE id = $2', [userEntry, id] )
        await client.query('COMMIT');
        const entries = result.rows[0].entries
        const data = {
          message: 'entries updated successfully',
          success: true,
          data: { entries, boundingBoxes  }
        };
  
        response.status(200).json(data);
      } else {
        await client.query('COMMIT');
        const message = 'no data found'
        response.status(401).send(message)
      }
  
    } catch (error) {
      await client.query('ROLLBACK');
      response.status(400).send(error.message);
      throw error;
    } finally {
      await client.end();
      console.timeEnd('start')
    }
  
    // pool.query(
    //   'UPDATE users SET entries = entries + 1 WHERE id = $1 RETURNING *',
    //   [id],
    //   (error, results) => {
    //     if (error) { 
    //       throw error;
    //     }
  
    //     const data = {
    //       message: 'entries updated successfully',
    //       success: true,
    //       data: results.rows[0].entries,
    //     };
  
    //     response.status(200).json(data);
    //   }
    // );
};
module.exports = {
      updateEntries
  }