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
// 정적파일 셋팅
// app.use(접근url, express.static(폴더명));
app.use('/static',express.static('uploads'));
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