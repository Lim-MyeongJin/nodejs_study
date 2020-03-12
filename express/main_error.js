const express = require('express');
const app = express();
const fs = require('fs');
const template = require('./lib/template');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const qs = require('querystring');
const port = 3002;
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false})); 
app.use(compression());
app.get('*',function(request,response,next){
  fs.readdir('./data',function(error,fileList){
    request.list = fileList;
    next();
  });  
});

app.get("/", function(request, response) {
  var title = "Welcome";
  var description = "Hello Node.js!!!!!!!!";
  var list = template.list(request.list);
  var html = template.html(title, list,
    `
      <h2>${title}</h2><p>${description}</p>
      <img src="/images/hello.jpg" style="width:200px;">
    `,
    `<a href="/create">create</a>`
  );
  response.send(html);
});

app.get("/page/:pageId", function(request, response) {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
    console.log('에러발생>>', err);
    if(err){
      next(err);
    }else{
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description);
      var list = template.list(request.list);
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
    }
  });
});

app.get("/create", function(request, response) {
  var title = "WEB - create";
  var list = template.list(request.list);
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
      </form>
    `,""
  );
  response.send(html);
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
});

app.get("/update/:pageId", function(request, response) {
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, "utf8", function(err, description) {
    var title = request.params.pageId;
    var list = template.list(request.list);
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

