// 쿠키설치
// >>npm install -s cookie


var http = require('http');
var cookie = require('cookie');
var port = 3000;


var server = http.createServer(function(req,res){

    console.log(req.headers.cookie);
    var cookies = {};
    if(req.headers.cookie != undefined){
        cookies = cookie.parse(req.headers.cookie);
    }
    console.log(cookies);
    console.log(cookies.num);
    

    res.writeHead(200,{
        'Content-Type':'text/html; charset=UTF-8',
        'Set-Cookie':['num=1','num2=2']
    });
    res.end('Cookie!!');
});

server.listen(port,function(){
    console.log(`Server Listening on port number ${port}`);
});