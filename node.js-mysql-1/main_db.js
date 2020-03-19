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

          //사용자가 보낸 값 그대로 사용하면 문제가 발생할 수 있기 때문에
          //두 번째 인자에 배열로써 값을 보내면 치환해서 물음표위치에 대입한다.
          //문제가 있는 데이터라면 세탁해주는 처리를 알아서 해준다.
          db.query(`SELECT * FROM TOPIC WHERE ID = ?`,[queryData.id],function(error2, topic){
            if(error2){ throw error2; }
            console.log('id값으로 검색된 결과>> ',topic);
            var title = topic[0].title;
            var description = topic[0].description;
            var list = template.list(topics);
            var html = template.HTML(title, list,
              `<h2>${title}</h2>${description}`,
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

        var title = 'WEB - Create';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
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


    } else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          /*fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });*/

          db.query('INSERT INTO TOPIC(title,description, created, author_id) VALUES(?,?,NOW(),?)',
              [title,description,1],
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

              var list = template.list(topics);
              var html = template.HTML(topic[0].title, list,
                `<form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${topic[0].id}">
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
          /*fs.rename(`data/${id}`, `data/${title}`, function(error){
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
            })
          });*/
          db.query('UPDATE TOPIC SET TITLE=?, DESCRIPTION=? WHERE ID=?',
              [title,description,id],
              function(error, result){
                if(error){console.log('오류발생>>',error);}
                console.log('삽입된 데이터>>',result);
                response.writeHead(302, {Location: `/?id=${result.insertId}`});
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
          fs.unlink(`data/${filteredId}`, function(error){
            response.writeHead(302, {Location: `/`});
            response.end();
          })
      });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
