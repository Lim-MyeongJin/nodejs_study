'use strict';

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

//요청에 대한 본문을 해석하는 방법 결정
//false인 경우, node.js의 내장모듈인 queryString 사용
//true인 경우, 별도 설치해야 하는 qs모듈 사용
//qs vs queryString : qs모듈은 추가적인 보안이 가능
app.use(bodyParser.urlencoded({extended:false}));   

app.set('views','./views');     //서버가 html파일을 읽을 수 있도록 경로지정
app.set('view engine', 'ejs');  //서버가 html파일을 읽을 때 ejs엔진을 사용하도록 설정
app.engine('html', require('ejs').renderFile); 

app.get('/',function(req,res){
    res.render('form.html');
});

app.post('/login',function(req,res){
    console.log(req.body);
    console.log(req.body.id);
    console.log(req.body.pw); 
    res.send(`환영합니다. ${req.body.id}님^^`);
});

app.listen(port, function(){
    console.log(`Express app listening on port ${port}`);
});