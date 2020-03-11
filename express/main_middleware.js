////////////// 미들웨어 장착(body-parser(body데이터분석&변환)/compression(압축)) //////////////
const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./lib/template');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const port = 3001;
const bodyParser = require('body-parser'); //본체인 데이터를 분석(Parser)해서 우리가 필요한 형태로 변환해주는 프로그램

//--> 사용자가 요청할 때마다 미들웨어가 실행
//--> 사용자가 전송한 post데이터를 내부적으로 분석해서 모든 데이터를 가져온다.
//--> post함수 내 콜백함수를 호출하도록 되어있다.
//--> 콜백함수 내 정의한 매개변수인 request변수에는 없었던 body속성가 미들웨어에 생성되어 사용할 수 있게 된다.
//--> body속성을 사용하게 되면 form태그로 입력된 값을 객체({})형태로 반환받는다. 
app.use(bodyParser.urlencoded({extended:false})); 
// app.use(compression());

app.get('/', function(request, response) {
  console.log(request.params);
  fs.readdir(`data`, function(err, fileList) {
    var title = "Welcome";
    var description = "Hello Node.js!!!!!!!!";
    var list = template.list(fileList);
    var html = template.html(title, list, 
      `<h2>${title}</h2><p>${description}</p>`,
      `<a href="/create">create</a>`
    );
    response.send(html);
    });
});

//URL Path방식으로 parameter를 처리하는 라우팅 기법
app.get("/page/:pageId", function(request, response) {
  fs.readdir(`data`, function(err, fileList) {
    
    var filteredId = path.parse(request.params.pageId).base;
    console.log(path.parse(request.params.pageId));

    fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
      var title = request.params.pageId;

      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description);

      var list = template.list(fileList);
      var html = template.html(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
        `
        <a href="/create">create</a> 
        <a href="/update/${sanitizedTitle}">update</a>
        <form action="/delete_process" method="POST">
          <input type="hidden" name="id" value="${sanitizedTitle}">
          <input type="submit" value="delete">
        </form>
        `
      );
      response.send(html);
    });
  });
});

app.get('/create',function(request, response){
  fs.readdir(`data`, function(err, fileList) {
          var title = "WEB - create";
          var list = template.list(fileList);
          var html = template.html(title, list, 
            `<form action="/create_process" method="POST">
              <p>
                  <input type="text" name="title" placeholder="title">
              </p>
              <p>
                  <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                  <input type="submit">
              </p>
             </form>`,
          '');
          response.send(html);
        });
});

app.post('/create_process',function(request,response){
  var post = request.body;
  console.log('>>>',request.body);
  var title = post.title;
  var description = post.description;

  fs.writeFile(`data/${title}`,description, 'utf8', function(err){

    response.writeHead(302,{'Location':`/page/${title}`});
    response.end('success');

  });

    // var body = '';
    // request.on('data',function(data){
    //     body = body + data;
    // });
    // request.on('end',function(){
    //   var post = qs.parse(body);
    //   var title = post.title;
    //   var description = post.description;

    //   fs.writeFile(`data/${title}`,description, 'utf8', function(err){

    //     response.writeHead(302,{'Location':`/page/${title}`});
    //     response.end('success');

    //   });
    // });  
});

app.get('/update/:pageId',function(request,response){
    fs.readdir(`data`, function(err, fileList) {
      var filteredId = path.parse(request.params.pageId).base;
      fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
        var title = request.params.pageId;
        var list = template.list(fileList);
        var html = template.html(title, list,
          `
          <form action="/update_process" method="POST">
            <input type="hidden" name="id" value="${title}">
            <p>
                <input type="text" name="title" placeholder="title" value="${title}">
            </p>
            <p>
                <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update/${title}">update</a>`
        );
        response.send(html);
      });
    });
});

app.post('/update_process',function(request,response){
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  console.log(post);

  fs.rename(`data/${id}`,`data/${title}`,function(err){
    fs.writeFile(`data/${title}`,description, 'utf8', function(err){
      response.redirect(`/page/${title}`);
    });
  });
});

app.post("/delete_process", function(request, response) {
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function() {
    response.redirect("/");
  });
});

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`);
});

