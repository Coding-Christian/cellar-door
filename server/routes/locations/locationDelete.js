const mysql = require('mysql');
const makeQuery = require('../makeQuery');

const locationDelete = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send('Student ID required');
  } else {
    const sql = `SELECT id FROM groceryItems WHERE locationId = ${mysql.escape(req.params.id)}`;
    const results = await makeQuery(sql)
      .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
    if (results.length) {
      res.status(409).send(`Location with ID ${req.params.id} is not empty.`);
    } else {
      const sql = `DELETE FROM storageLocations WHERE id = ${mysql.escape(req.params.id)}`;
      const results = await makeQuery(sql)
        .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
      if (!results.affectedRows) {
        res.status(404).send(`Location with ID ${req.params.id} not found`);
      } else {
        res.status(200).send({ 'id': Number(req.params.id) });
      }
    }
  }
};

module.exports = locationDelete;
