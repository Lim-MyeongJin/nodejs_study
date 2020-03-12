/*
  프로젝트가 커졌을 때, 라우터 관리 -> 파일로 분리
*/
const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./lib/template');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const port = 3000;
const bodyParser = require('body-parser');
const compression = require('compression');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false})); 
app.use(compression());
app.get('*',function(request,response,next){
  fs.readdir('./data',function(error,fileList){
    request.list = fileList;
    next();
  });  
});

app.use('/',indexRouter); 
// URL요청이 들어왔을 때 '/topic'으로 시작한 경로들에게 topicRouter라는 미들웨어를 적용
app.use('/topic',topicRouter); 

app.use(function(request,response,next){
  response.status(404).send(`Sorry can't find that!`);
});

app.use(function(error, request,response,next){
  console.log(error.stack);
  response.status(500).send(`Something broke!`);
});


app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`);
});

