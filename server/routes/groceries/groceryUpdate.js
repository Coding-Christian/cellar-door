const mysql = require('mysql');
const makeQuery = require('../makeQuery');

const groceryUpdate = async function (req, res) {
  const reqProps = ['id', 'name', 'category', 'amount', 'amountRemaining', 'unit', 'purchaseDate', 'expirationDate', 'location', 'notes'];
  for (const prop in reqProps) {
    if (!req.body.hasOwnProperty(reqProps[prop])) {
      res.status(400).send(`Item ${reqProps[prop]} required.`);
      return;
    }
  }
  const {
    id, name, category, amount, amountRemaining, unit, purchaseDate, expirationDate, location, notes
  } = req.body;
  let sql =
    'UPDATE groceryItems ' +
    'SET itemName = ?, categoryId = ?, amount = ?, remainingAmount = ?, amountUnitId = ?, purchaseDate = ?, expirationDate = ?, locationId = ?, notes = ? ' +
    'WHERE id = ?';
  const inserts = [name, category, amount, amountRemaining, unit, purchaseDate, expirationDate, location, notes, id];
  sql = mysql.format(sql, inserts);
  const results = await makeQuery(sql)
    .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
  if (!results.affectedRows) {
    res.status(404).send(`Item with ID ${req.params.id} not found`);
  } else {
    res.status(200).send({ 'id': Number(req.body.id) });
  }
};

module.exports = groceryUpdate;
