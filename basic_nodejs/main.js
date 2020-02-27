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

//main.js에서 여기 3000이라고 했고 주소창에도 3000이라고 하는 것은
//여기 3000번 포트에 우리의 nodejs 웹서버를 실행시킨거기 때문에
//접속할 때 3000번을 명시해야 한다는 것이죠.
//3000 대신 80으로 설정하면 포트번호를 생략해도 됩니다.
//왜냐면 웹서버는 굉장히 유명한 서버이기 때문에 
//웹서버는 80번 포트를 쓴다라고 전세계적으로 약속되어있기 때문에
//우리가 http를 통해서 접속했다 그러면 웹서버에 접속한 거에요.
//그러면 80을 생략하면  