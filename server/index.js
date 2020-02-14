const express = require('express');
const mysql = require('mysql');
const dbcredentials = require('./_config');
const groceryRouter = require('./routes/groceries/');
const locationRouter = require('./routes/locations/');
const categoryRouter = require('./routes/categories/');

const server = express();
server.use(express.json());
server.use('/api', groceryRouter);
server.use('/api', locationRouter);
server.use('/api', categoryRouter);

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

server.get('/api/units', async (req, res) => {
  const sql =
    'SELECT id, unitName AS name, abbreviation ' +
    'FROM amountUnits';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
});

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server listening on port 3001\n');
});
