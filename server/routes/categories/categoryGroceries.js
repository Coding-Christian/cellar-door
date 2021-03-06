const mysql = require('mysql');
const makeQuery = require('../makeQuery');

const categoryGroceries = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send('Location ID required');
  } else {
    const sql =
    'SELECT groceryItems.id AS id, itemName, remainingAmount, unitName, locationName ' +
    'FROM groceryItems ' +
    'JOIN amountUnits ' +
      'ON amountUnitid = amountUnits.id ' +
    'JOIN storageLocations ' +
      'ON locationId = storageLocations.id ' +
    `WHERE categoryId = ${mysql.escape(req.params.id)}`;
    const results = await makeQuery(sql)
      .catch(() => res.status(500).send('An error occurred while connecting to the database'));
    res.status(200).send(results);
  }
};

module.exports = categoryGroceries;
