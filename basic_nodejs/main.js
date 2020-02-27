//지금당장은 이해가 안되겠지만 이걸 이해하는게 저희 수업의 목표!

var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + url);
    response.end(fs.readFileSync(__dirname + url));
    // response.end('nodejs : '+url);
 
});
app.listen(3000);