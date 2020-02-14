const makeQuery = require('../makeQuery');

const unitList = async function (req, res) {
  const sql =
    'SELECT id, unitName AS name, abbreviation ' +
    'FROM amountUnits';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
};

module.exports = unitList;
