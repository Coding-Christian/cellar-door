const makeQuery = require('../makeQuery');

const categoryList = async function (req, res) {
  const sql =
    'SELECT id, categoryName AS name ' +
    'FROM groceryCategories';
  const results = await makeQuery(sql)
    .catch(() => res.status(500).send('An error occurred while connecting to the database'));
  res.status(200).send(results);
};

module.exports = categoryList;
