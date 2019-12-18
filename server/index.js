// const path = require('path');
const express = require('express');
const server = express();
const mysql = require('mysql');
const dbcredentials = require('./_config');

const endpoint = (req, res) => {
  const sql = 'SELECT * FROM `grades` WHERE 1';
  const connection = mysql.createConnection(dbcredentials.credentials);
  connection.connect();
  connection.query(sql, (error, results) => {
    if (error) {
      connection.end();
      throw error;
    }
    res.send(results);
    connection.end();
  });
};

server.use('/api/grades', endpoint);
server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server listening on port 3001\n');
});
