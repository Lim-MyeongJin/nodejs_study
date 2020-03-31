/////////////////////////////////// express의 기본구조 /////////////////////////////////// 
// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', function(request, respose) {
//   return res.send('Hello World!');
// });

// app.listen(port, function(){
//   console.log(`Example app listening on port ${port}!`);
// });

/////////////////////////////////// get방식으로 전송하는 값 가져오기 /////////////////////////////////// 
// const express = require('express');
// const app = express();
// const fs = require('fs');
// const template = require('./lib/template');
// const port = 3000;


// //route, routing(라우팅)
// //  - 사용자들이 접속할 때 그 어떤 경로로 접속했는지에 따라 다른 처리를 할 수 있도록 구분해주는 기능 
// //  - 사용자 요청에 응답하는 방법을 결정하는 기능
// //  - if문으로 구분하지 않아도 되기 때문에 코드의 복잡성을 줄일 수 있다.
// app.get('/', function(request, response) {
//   console.log(request.params);
//   fs.readdir(`data`, function(err, fileList) {
//     var title = "Welcome";
//     var description = "Hello Node.js!!!!!!!!";
//     var list = template.list(fileList);
//     var html = template.html(title, list, 
//       `<h2>${title}</h2><p>${description}</p>`,
//       `<a href="/create">create</a>`
//     );
//     response.send(html);
//     });
// });

// app.get('/page',function(request,response){

//   return response.send(request.param('pageId'));
  
// });

// app.get('/page/:pageId/:chapterId',function(request,response){

//   return response.send(request.param('pageId')+'/'+request.param('chapterId'));

// });

// app.get('/page/:pageId/:chapterId',function(request,response){

//   return response.send(request.params);

// });

// app.listen(port, function(){
//   console.log(`Example app listening on port ${port}!`);
// });

/////////////////////////////////// 상세페이지 구현 /////////////////////////////////// 
const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./lib/template_origin');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const port = 3000;

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
  console.log(request.baseUrl);
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
    var body = '';
    request.on('data',function(data){
        body = body + data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;

      fs.writeFile(`data/${title}`,description, 'utf8', function(err){

        response.writeHead(302,{'Location':`/page/${title}`});
        response.end('success');

      });
    });  
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
    var body = '';
    request.on('data',function(data){
        body = body + data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
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
});

app.post('/delete_process',function(request,response){
    var body = '';
    request.on('data',function(data){
        body = body + data;
    });
    request.on('end',function(){
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`,function(){
        response.redirect('/');
      });
    });
});

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`);
});

