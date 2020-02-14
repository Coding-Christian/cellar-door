const mysql = require('mysql');
const makeQuery = require('../makeQuery');

const groceryDelete = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send('Student ID required');
  } else {
    const sql = `DELETE FROM groceryItems WHERE id = ${mysql.escape(req.params.id)}`;
    const results = await makeQuery(sql)
      .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
    if (!results.affectedRows) {
      res.status(404).send(`Item with ID ${req.params.id} not found`);
    } else {
      res.status(200).send({ 'id': Number(req.params.id) });
    }
  }
};

module.exports = groceryDelete;
