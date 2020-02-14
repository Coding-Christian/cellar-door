const mysql = require('mysql');
const dbcredentials = require('../_config.js');

const makeQuery = function (sql) {
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
};

module.exports = makeQuery;
