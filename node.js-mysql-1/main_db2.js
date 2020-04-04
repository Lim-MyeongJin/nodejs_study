var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');

var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'111111',
  database:'test'
});

db.connect();

var app = http.createServer(function(request,response){
    var _url = request.url;
    console.log(_url);
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){
        db.query('SELECT * FROM TOPIC',function(error, topics, fields){
          if(error){console.log('오류발생>>',error);}
          console.log(topics);

          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);

        });

      } else {
        db.query('SELECT * FROM TOPIC',function(error, topics, fields){
          if(error){ throw error; }
          
          db.query(`select * from topic LEFT JOIN author ON topic.author_id = author.id where topic.id = ?`,[queryData.id],function(error2, topic){
            if(error2){ throw error2; }

            console.log(topic);

            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);
            var html = template.HTML(title, list,
              `<h2>${title}</h2>
              ${description}
              <p>by ${topic[0].name}</p>
              `,
              `<a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>`
            );
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    } else if(pathname === '/create'){
     
      db.query('SELECT * FROM TOPIC',function(error, topics, fields){
        if(error){console.log('오류발생>>',error);}
        console.log(topics);

        db.query('SELECT * FROM AUTHOR',function(error, authors, fields){

          console.log(authors);

          var title = 'WEB - Create';
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<form action="/create_process" method="post">
              <p>
                ${template.authorSelect(authors)}
              </p> 
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
            ``
          );
          response.writeHead(200);
          response.end(html);
        });
      
      });


    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var author = post.author;
          var title = post.title;
          var description = post.description;

          db.query('INSERT INTO TOPIC(title,description, created, author_id) VALUES(?,?,NOW(),?)',
              [title,description,author],
              function(error, result){
                if(error){console.log('오류발생>>',error);}
                console.log('삽입된 데이터>>',result);
                response.writeHead(302, {Location: `/?id=${result.insertId}`});
                response.end();
              }
          );
      });
    } else if(pathname === '/update'){
        db.query('SELECT * FROM TOPIC',function(error, topics, fields){
            if(error){ throw error; }

            db.query(`SELECT * FROM TOPIC WHERE ID = ?`,[queryData.id],function(error2, topic){
              if(error2){ throw error2; }

              db.query('SELECT * FROM AUTHOR',function(error, authors, fields){
                
                var list = template.list(topics);
                var html = template.HTML(topic[0].title, list,
                  `<form action="/update_process" method="post">
                      <input type="hidden" name="id" value="${topic[0].id}">
                      <p>
                        ${template.authorSelect(authors)}
                      </p> 
                      <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                      <p>
                        <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                      </p>
                      <p>
                        <input type="submit">
                      </p>
                  </form>
                  `,
                  `<a href="/create">create</a>
                  <a href="/update?id=${topic[0].id}">update</a>`
                );
                response.writeHead(200);
                response.end(html);

              });
            });
      });
    } else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var title = post.title;
          var description = post.description;

          db.query('UPDATE TOPIC SET TITLE=?, DESCRIPTION=?, AUTHOR_ID=? WHERE ID=?',
              [title, description, post.author, id],
              function(error, result){
                if(error){console.log('오류발생>>',error);}
                console.log('삽입된 데이터>>',result);
                response.writeHead(302, {Location: `/?id=${id}`});
                response.end();
              }
          );
      });
    } else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          var filteredId = path.parse(id).base;

          db.query('DELETE FROM topic where id=?', [id], function(error, result){
                if(error){console.log('오류발생>>',error);}
                console.log('삽입된 데이터>>',result);
                response.writeHead(302, {Location: `/`});
                response.end();
              }
          );
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
