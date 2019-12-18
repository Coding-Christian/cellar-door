const express = require('express');
const server = express();
const mysql = require('mysql');
const dbcredentials = require('./_config');

function makeQuery(sql, credentials) {
  const connection = mysql.createConnection(credentials);
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

server.get('/api/grades', async (req, res) => {
  const sql = 'SELECT * FROM `grades`';
  const results = await makeQuery(sql, dbcredentials.credentials);
  res.send(results);
});

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server listening on port 3001\n');
});
