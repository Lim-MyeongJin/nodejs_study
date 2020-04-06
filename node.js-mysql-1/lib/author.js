var db = require('./db');
var template = require('./template');
var url = require('url');
var qs = require('querystring');
var sanitizeHTML = require('sanitize-html');

exports.home = function(request,response){
    db.query('SELECT * FROM TOPIC',function(error, topics){
        if(error){console.log('오류발생>>',error);}
    
        db.query('SELECT * FROM AUTHOR',function(error, authors){
            console.log('authors 테이블>> ',authors);
            if(error){console.log('오류발생>>',error);}

            var title = 'Author List';
            var list = template.list(topics);
            var html = template.HTML(title, list,
            `
            <h2>${title}</h2>
            ${template.authorTable(authors)}
            <form action="/author/create_process" method="post">
                <p>
                    <input type="text" name="name" placeholder="name">
                </p>  
                <p>
                    <textarea name="profile" placeholder="profile"></textarea>
                </p>
                <p>
                    <input type="submit" value="create">
                </p>
                </form>
            `,
            ``
            );
            response.writeHead(200);
            response.end(html); 
        });

    });
}

exports.create_process = function(request,response){
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      var name = post.name;
      var profile = post.profile;

      db.query(
        'INSERT INTO AUTHOR(name, profile) VALUES(?,?)',
        [name, profile],
        function(error, result) {
          if (error) { console.log('오류발생>>', error); }

          response.writeHead(302, {Location: `/author`});
          response.end();
        }
      );
    });
}

exports.update = function(request,response){
    db.query('SELECT * FROM TOPIC',function(error, topics){
        if(error){console.log('오류발생>>',error);}
    
        db.query('SELECT * FROM AUTHOR',function(error2, authors){
            if(error){console.log('오류발생>>',error2);}
            var _url = request.url;
            var queryData = url.parse(_url, true).query;

            db.query('SELECT * FROM AUTHOR WHERE id=?',[queryData.id],function(error3, author){

                console.log(author[0].profile);

                var title = 'Author List';
                var list = template.list(topics);
                var html = template.HTML(title, list,
                `
                <h2>${title}</h2>
                ${template.authorTable(authors)}
                <form action="/author/update_process" method="post">
                    <p>
                        <input type="hidden" name="id" value="${queryData.id}">
                    </p>              
                    <p>
                        <input type="text" name="name" placeholder="name" value="${sanitizeHTML(author[0].name)}">
                    </p>  
                    <p>
                        <textarea name="profile" placeholder="profile">${sanitizeHTML(author[0].profile)}</textarea>
                    </p>
                    <p>
                        <input type="submit" value="update">
                    </p>
                    </form>
                `,
                ``
                );
                response.writeHead(200);
                response.end(html); 
            });
            
        });

    });   
}

exports.update_process = function(request,response){
    var body = '';
    request.on('data', function(data) {
      body = body + data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      var id = post.id;
      var name = post.name;
      var profile = post.profile;
  
      db.query(
        'UPDATE AUTHOR SET NAME=?, PROGILE=? WHERE ID=?',
        [name, profile, id],
        function(error, result) {
          if (error) { console.log('오류발생>>', error); }

          response.writeHead(302, {Location: `/author`});
          response.end();
        }
      );
    });
}

exports.delete = function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;

        db.query('DELETE FROM author where id=?', [id], function(error, result){
              if(error){console.log('오류발생>>',error);}

              response.writeHead(302, {Location: `/author`});
              response.end();
            }
        );
    });
}

