const mysql = require('mysql');
const makeQuery = require('../makeQuery.js');

const groceryAdd = async function (req, res) {
  const reqProps = ['name', 'category', 'amount', 'amountRemaining', 'unit', 'purchaseDate', 'expirationDate', 'location', 'notes'];
  for (const prop in reqProps) {
    if (!req.body.hasOwnProperty(reqProps[prop])) {
      res.status(400).send(`Item ${reqProps[prop]} required.`);
      return;
    }
  }
  const {
    name, category, amount, amountRemaining, unit, purchaseDate, expirationDate, location, notes
  } = req.body;
  let sql =
    'INSERT INTO groceryItems ' +
    '(id, itemName, categoryId, amount, remainingAmount, amountUnitId, purchaseDate, expirationDate, locationId, notes) ' +
    'VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const inserts = [name, category, amount, amountRemaining, unit, purchaseDate, expirationDate, location, notes];
  sql = mysql.format(sql, inserts);
  const results = await makeQuery(sql)
    .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
  res.status(200).send({ 'id': results.insertId });
};

module.exports = groceryAdd;
