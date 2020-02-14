const makeQuery = require('../makeQuery');

const locationList = async function (req, res) {
  const sql =
    'SELECT id, locationName AS name, description ' +
    'FROM storageLocations';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
};

module.exports = locationList;
