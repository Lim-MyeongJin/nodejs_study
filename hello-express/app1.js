const express = require('express');
const admin = require('./route/admin');
const contacts = require('./route/contacts');
const app = express();
const port = 3000;

//미들웨어 사용
app.use('/admin',admin); // /admin까지는 route폴더 내 admin.js를 참조하도록 설정
app.use('/contacts',contacts);

app.get('/', function(req,res){
    res.send('Index Page.....');
});

app.listen(port,function(){
    console.log(`Express listening on port ${port}`);
});