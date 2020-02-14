const mysql = require('mysql');
const makeQuery = require('../makeQuery');

const groceryDetails = async function (req, res) {
  if (!req.params.id) {
    res.status(400).send('Item ID required');
  } else {
    const sql =
      'SELECT * ' +
      'FROM groceryItems ' +
      'JOIN groceryCategories ' +
        'ON categoryId = groceryCategories.id ' +
      'JOIN amountUnits ' +
        'ON amountUnitid = amountUnits.id ' +
      'JOIN storageLocations ' +
        'ON locationId = storageLocations.id ' +
      `WHERE groceryItems.id = ${mysql.escape(req.params.id)}`;
    const results = await makeQuery(sql)
      .catch(() => res.status(500).send('An error occurred while connecting to the database'));
    if (!results.length) {
      res.status(404).send(`Item with ID ${req.params.id} not found`);
    } else {
      res.status(200).send({
        'id': results[0].id,
        'name': results[0].itemName,
        'category': {
          'id': results[0].categoryId,
          'name': results[0].categoryName
        },
        'amount': {
          'initial': results[0].amount,
          'quantity': results[0].remainingAmount,
          'unit': results[0].unitName,
          'unitId': results[0].amountUnitId
        },
        'purchaseDate': results[0].purchaseDate.toISOString().substring(0, 10),
        'expirationDate': results[0].expirationDate.toISOString().substring(0, 10),
        'location': {
          'id': results[0].locationId,
          'name': results[0].locationName,
          'description': results[0].description
        },
        'notes': results[0].notes
      });
    }
  }
};

module.exports = groceryDetails;
