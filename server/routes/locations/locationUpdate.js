const mysql = require('mysql');
const makeQuery = require('../makeQuery');

const locationUpdate = async function (req, res) {
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
};

module.exports = locationUpdate;
