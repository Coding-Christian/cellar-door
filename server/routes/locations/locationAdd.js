const mysql = require('mysql');
const makeQuery = require('../makeQuery');

const locationAdd = async function (req, res) {
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
};

module.exports = locationAdd;
