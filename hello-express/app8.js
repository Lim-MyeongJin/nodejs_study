const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');

const admin = require('./route/admin4');
const contacts = require('./route/contacts');

const app = express();
const port = 3000;

nunjucks.configure('template',{
    autoescape:true,
    express:app
});

app.use('/static',express.static('uploads'));
app.use(function(req,res,next){
    // req.path: 현재 url 정보
    app.locals.isLogin = true;
    app.locals.req_path = req.path;
    next();
});
app.use(logger('dev'));
app.use('/admin', vipMidlleware, admin); 
app.use('/contacts',contacts);

//오류처리
app.use(function(req, res, _){
    res.status(404).render('common/404.html');
});
app.use(function(req, res, _){
    res.status(500).render('common/500.html');
});

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