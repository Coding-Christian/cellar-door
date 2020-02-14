const makeQuery = require('../makeQuery');

const groceryList = async function (req, res) {
  const sql =
    'SELECT groceryItems.id AS id, itemName, remainingAmount, unitName, locationName ' +
    'FROM groceryItems ' +
    'JOIN amountUnits ' +
      'ON amountUnitid = amountUnits.id ' +
    'JOIN storageLocations ' +
      'ON locationId = storageLocations.id';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
};

module.exports = groceryList;
