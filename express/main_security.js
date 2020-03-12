/*
  프로젝트 보안 자동처리 -> helmet
  대표적으로 발생될 수 있는 보안문제를 자동으로 해결

  설치)
  >> npm install --save helmet
  >> npm install nsp -g
  >> nsp check -> json파일에 있는 dependencies의 내용을 검색해서 문제가 될만한 게 있는지 체크해주는 모듈
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
const helmet = require('helmet');
app.use(helmet());

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

