// var http = require("http");
// var fs = require("fs");
// var url = require("url");
// var qs = require('querystring');
// var template = require('./lib/template');
// var path = require('path');
// var sanitizeHtml = require('sanitize-html');

// var app = http.createServer(function(request, response) {
//   var _url = request.url;
//   var queryData = url.parse(_url, true).query;
//   var pathname = url.parse(_url, true).pathname;
  
//   if (pathname === "/") {
//     if (queryData.id === undefined) {
//       fs.readdir(`data`, function(err, fileList) {
//         var title = "Welcome";
//         var description = "Hello Node.js!!!!!!!!";
//         var list = template.list(fileList);
//         var html = template.html(title, list, 
//           `<h2>${title}</h2><p>${description}</p>`,
//           `<a href="/create">create</a>`
//         );
//         response.writeHead(200);
//         response.end(html);
//       });
    
//     } else {
//       fs.readdir(`data`, function(err, fileList) {
//         //외부로부터 경로정보가 넘어올 때, 외부로부터 시스템경로 노출을 막기 위해 path.parse() 적용
//         var filteredId = path.parse(queryData.id).base; 
//         console.log(path.parse(queryData.id));
//         fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
//           var title = queryData.id;

//           //사용자로부터 입력된 오염된 정보(script태그, 불법HTML코드 ..)를 동작하지 없애버리는 작업  
//           var sanitizedTitle = sanitizeHtml(title);
//           var sanitizedDescription = sanitizeHtml(description);
          
//           var list = template.list(fileList);
//           var htmkl = template.html(sanitizedTitle, list,
//             `<h2>${sanitizedTitle}</h2><p>${sanitizedDescription}</p>`,
//             `
//             <a href="/create">create</a> 
//             <a href="/update?id=${sanitizedTitle}">update</a>
//             <form action="delete_process" method="POST">
//               <input type="hidden" name="id" value="${sanitizedTitle}">
//               <input type="submit" value="delete">
//             </form>
//             `
//           );
//           response.writeHead(200);
//           response.end(htmkl);
//         });
//       });
//     }
//   }else if(pathname === '/create'){
//     fs.readdir(`data`, function(err, fileList) {
//       var title = "WEB - create";
//       var list = template.list(fileList);
//       var html = template.html(title, list, 
//         `<form action="/create_process" method="POST">
//           <p>
//               <input type="text" name="title" placeholder="title">
//           </p>
//           <p>
//               <textarea name="description" placeholder="description"></textarea>
//           </p>
//           <p>
//               <input type="submit">
//           </p>
//          </form>`,
//       '');
//       response.writeHead(200);
//       response.end(html);
//     });
//   }else if(pathname === '/create_process'){
//     var body = '';
//     request.on('data',function(data){
//         body = body + data;

//         //POST방식으로 많은 양의 데이터가 들어온 경우 연결종료
//         //1e6 --> 1 * Math.pow(10,6) --> 1 * 1000000 ~~~~ 1MB
//         /*if(body.length > 1e6){ 
//           request.connection.destory();
//         }*/
//     });
//     request.on('end',function(){
//       var post = qs.parse(body);
//       var title = post.title;
//       var description = post.description;

//       //파일생성
//       fs.writeFile(`data/${title}`,description, 'utf8', function(err){

//         response.writeHead(302,{'Location':`/?id=${title}`});
//         response.end('success');

//       });
//     });    
//   }else if(pathname === '/update'){
//     fs.readdir(`data`, function(err, fileList) {
//       var filteredId = path.parse(queryData.id).base;
//       fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
//         var title = queryData.id;
//         var list = template.list(fileList);
//         var html = template.html(title, list,
//           `
//           <form action="/update_process" method="POST">
//             <input type="hidden" name="id" value="${title}">
//             <p>
//                 <input type="text" name="title" placeholder="title" value="${title}">
//             </p>
//             <p>
//                 <textarea name="description" placeholder="description">${description}</textarea>
//             </p>
//             <p>
//                 <input type="submit">
//             </p>
//           </form>
//           `,
//           `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
//         );
//         response.writeHead(200);
//         response.end(html);
//       });
//     });
//   }else if(pathname === '/update_process'){
//     var body = '';
//     request.on('data',function(data){
//         body = body + data;
//     });
//     request.on('end',function(){
//       var post = qs.parse(body);
//       var id = post.id;
//       var title = post.title;
//       var description = post.description;
//       console.log(post);

//       fs.rename(`data/${id}`,`data/${title}`,function(err){
//         fs.writeFile(`data/${title}`,description, 'utf8', function(err){

//           response.writeHead(302,{'Location':`/?id=${title}`});
//           response.end('success');
  
//         });//end fs.writeFile  
//       });//end fs.rename
//     });//end request.on    
//   }else if(pathname === '/delete_process'){
//     //페이지 이동이 아닌 바로 삭제 
//     var body = '';
//     request.on('data',function(data){
//         body = body + data;
//     });
//     request.on('end',function(){
//       var post = qs.parse(body);
//       var id = post.id;
//       var filteredId = path.parse(id).base;
//       fs.unlink(`data/${filteredId}`,function(){
//         response.writeHead(302,{'Location':`/`});
//         response.end('success');
//       });
//     });
//   }else {
//     response.writeHead(404);
//     response.end("Not found..");
//   }
// });
// app.listen(3000);

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
const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./lib/template');
const port = 3000;


//route, routing(라우팅)
//  - 사용자들이 접속할 때 그 어떤 경로로 접속했는지에 따라 다른 처리를 할 수 있도록 구분해주는 기능 
//  - 사용자 요청에 응답하는 방법을 결정하는 기능
//  - if문으로 구분하지 않아도 되기 때문에 코드의 복잡성을 줄일 수 있다.
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

// app.get('/page',function(request,response){

//   return response.send(request.param('pageId'));
  
// });

app.get('/page/:pageId/:chapterId',function(request,response){

  return response.send(request.param('pageId')+'/'+request.param('chapterId'));

});

// app.get('/page/:pageId/:chapterId',function(request,response){

//   return response.send(request.params);

// });

app.listen(port, function(){
  console.log(`Example app listening on port ${port}!`);
});
