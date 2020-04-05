// db에 중요한 내용을 비워버리고 나중에 받아서 쓸 때 그 때 채워넣고 사용한다.
var mysql = require('mysql');
var db = mysql.createConnection({
    host:'',
    user:'',
    password:'',
    database:''
  });

  db.connect();

  module.exports = db;