var mysql = require("mysql");

var pool = mysql.createConnection({
  connectionLimit: 10, // important!
  host: '98.212.150.62',
  user: 'remoteuser',
  password: 'sqlPi',
  database: 'bubbleChamber',
});

module.exports.pool = pool;
