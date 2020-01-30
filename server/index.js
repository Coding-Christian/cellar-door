const express = require('express');
const server = express();
const mysql = require('mysql');
const dbcredentials = require('./_config');
server.use(express.json());

function makeQuery(sql) {
  const connection = mysql.createConnection(dbcredentials.credentials);
  connection.connect();
  const sqlPromise = new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      connection.end();
      if (error) { reject(error); }
      resolve(results);
    });
  });
  return sqlPromise;
}

server.get('/api/groceries', async (req, res) => {
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
});

server.get('/api/groceries/:id', async (req, res) => {
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
        'category': results[0].categoryName,
        'amount': {
          'initial': results[0].amount,
          'quantity': results[0].remainingAmount,
          'unit': results[0].unitName
        },
        'purchaseDate': results[0].purchaseDate,
        'expirationDate': results[0].expirationDate,
        'location': {
          'id': results[0].locationId,
          'name': results[0].locationName,
          'description': results[0].description
        },
        'notes': results[0].notes
      });
    }
  }
});

server.get('/api/locations', async (req, res) => {
  const sql =
  'SELECT id, locationName AS name, description ' +
  'FROM storageLocations';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
});

server.get('/api/locations/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Location ID required');
  } else {
    const sql =
    'SELECT groceryItems.id AS id, itemName, remainingAmount, unitName ' +
    'FROM groceryItems ' +
    'JOIN amountUnits ' +
      'ON amountUnitid = amountUnits.id ' +
    `WHERE locationId = ${mysql.escape(req.params.id)}`;
    const results = await makeQuery(sql)
      .catch(() => res.status(500).send('An error occurred while connecting to the database'));
    res.status(200).send(results);
  }
});

server.get('/api/categories', async (req, res) => {
  const sql =
    'SELECT id, categoryName AS name ' +
    'FROM groceryCategories';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
});

server.get('/api/categories/:id', async (req, res) => {
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
});

server.get('/api/units', async (req, res) => {
  const sql =
    'SELECT id, unitName AS name, abbreviation ' +
    'FROM amountUnits';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
});

server.delete('/api/groceries/:id', async (req, res) => {
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
});

server.delete('/api/locations/:id', async (req, res) => {
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
});

server.patch('/api/groceries', async (req, res) => {
  const reqProps = ['id', 'name', 'category', 'amount', 'amountRemaining', 'unit', 'purchaseDate', 'expirationDate', 'location', 'notes'];
  for (const prop in reqProps) {
    if (!req.body[reqProps[prop]]) {
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
});

server.patch('/api/locations', async (req, res) => {
  const reqProps = ['id', 'name', 'description'];
  for (const prop in reqProps) {
    if (!req.body[reqProps[prop]]) {
      res.status(400).send(`Location ${reqProps[prop]} required.`);
      return;
    }
  }
  const { id, name, description } = req.body;
  let sql = 'UPDATE storageLocations SET locationName = ?, description = ? WHERE id = ?';
  const inserts = [name, description, id];
  sql = mysql.format(sql, inserts);
  const results = await makeQuery(sql)
    .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
  if (!results.affectedRows) {
    res.status(404).send(`Location with ID ${req.params.id} not found`);
  } else {
    res.status(200).send({ 'id': Number(req.body.id) });
  }
});

server.post('/api/groceries', async (req, res) => {
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
});

server.post('/api/locations', async (req, res) => {
  const reqProps = ['name', 'description'];
  for (const prop in reqProps) {
    if (!req.body[reqProps[prop]]) {
      res.status(400).send(`Location ${reqProps[prop]} required.`);
      return;
    }
  }
  const { name, description } = req.body;
  let sql = 'INSERT INTO storageLocations (id, locationName, description) VALUES (NULL, ?, ?)';
  const inserts = [name, description];
  sql = mysql.format(sql, inserts);
  const results = await makeQuery(sql)
    .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
  res.status(200).send({ 'id': results.insertId });
});

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server listening on port 3001\n');
});
