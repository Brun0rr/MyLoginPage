var mysql = require('mysql');

var connection = function(){
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mariadb',
    port: 3306,
    database: 'minha_base',
    multipleStatements: true
  });
};

module.exports = connection;
