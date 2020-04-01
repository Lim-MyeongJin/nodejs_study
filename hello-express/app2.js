const express = require('express');
const nunjucks = require('nunjucks');

const admin = require('./route/admin');
const contacts = require('./route/contacts');

const app = express();
const port = 3000;

//nunjucks.configure(폴더명,{});
//autoescape:true --> 외부 스크립트 공격를 막기위해 tag를 문자열로 변환
// false로 설정하면 tag가 적용되버린다.
nunjucks.configure('template',{
    autoescape:true,
    express:app
});

//미들웨어 사용
app.use('/admin',admin); // /admin까지는 route폴더 내 admin.js를 참조하도록 설정
app.use('/contacts',contacts);

app.get('/', function(req,res){
    res.send('Index Page.....');
});

app.listen(port,function(){
    console.log(`Express listening on port ${port}`);
});