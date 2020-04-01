const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');

const admin = require('./route/admin3');
const contacts = require('./route/contacts');

const app = express();
const port = 3000;

nunjucks.configure('template',{
    autoescape:true,
    express:app
});

app.use('/static',express.static('uploads'));
app.use(logger('dev'));

//urlencoded({extended:false}): node.js에 기본으로 내장된 queryString 모듈로 설정
//urlencoded({extended:true}): 따로 설치가 필요한 npm qs 모듈로 설정(추가적인 보안이 가능) 'qs'를 설치하지 않는다면 false로 지정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//body-parser만들기
app.use(function(req,res,next){
    req.body = {

    }
});

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