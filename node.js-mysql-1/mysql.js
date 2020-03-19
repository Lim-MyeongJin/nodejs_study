var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'test'
});
 
connection.connect();
 
connection.query('SELECT * FROM topic', function (error, results, fields) {
  if (error) {
      console.log(err);
  }
  console.log(results); 
  console.log(fields); 
});
 
connection.end();


// console.log(results); //데이터베이스 내 저장된 내용 하나하나를 객체배열로 반환
//   console.log(fields); //해당 테이블의 필드에 관련된 정보를 객체배열로 반환