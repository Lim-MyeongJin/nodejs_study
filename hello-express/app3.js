const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');

const admin = require('./route/admin2');
const contacts = require('./route/contacts');

const app = express();
const port = 3000;

nunjucks.configure('template',{
    autoescape:true,
    express:app
});

//미들웨어: 요청과 응답 사이에 처리해야 할 일들을 동작시키는 프로그램
//app.use()
app.use(logger('dev'));

app.use('/admin', vipMidlleware, admin); 
app.use('/contacts',contacts);

function vipMidlleware(req,res,next){
    console.log('최우선 미들웨어');
    next();
}

app.get('/', function(req,res){
    res.send('Index Page.....');
});

app.listen(port,function(){
    console.log(`Express listening on port ${port}`);
});