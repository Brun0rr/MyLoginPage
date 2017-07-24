var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mariadb',
  port: 3306,
  database: 'minha_base',
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
