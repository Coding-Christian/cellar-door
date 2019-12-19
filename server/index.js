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

server.get('/api/grades', async (req, res) => {
  const sql = 'SELECT * FROM grades';
  const results = await makeQuery(sql)
    .catch(() => { res.status(500).send('An error occurred while connecting to the database'); });
  res.status(200).send(results);
});

server.delete('/api/grades/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Student ID required');
  } else {
    const sql = `DELETE FROM grades WHERE id = ${mysql.escape(req.params.id)}`;
    const results = await makeQuery(sql)
      .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
    if (!results.affectedRows) {
      res.status(404).send(`Student with ID ${req.params.id} not found`);
    } else {
      res.status(200).send({ 'id': Number(req.params.id) });
    }
  }
});

server.post('/api/grades', async (req, res) => {
  const reqProps = ['name', 'course', 'grade'];
  for (let prop in reqProps) {
    if (!req.body[reqProps[prop]]) {
      res.status(400).send(`Student ${reqProps[prop]} required`);
      return;
    }
  }
  const { name, course, grade } = req.body;
  let sql = `INSERT INTO grades (id, name, course, grade) VALUES (NULL, ?, ?, ?)`;
  const inserts = [name, course, grade];
  sql = mysql.format(sql, inserts);
  const results = await makeQuery(sql)
    .catch(() => { res.status(500).send('An Error occurred while connecting to the database'); });
  res.status(200).send({ 'id': results.insertId });
});

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server listening on port 3001\n');
});
