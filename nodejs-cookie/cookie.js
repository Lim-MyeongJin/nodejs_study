var http = require('http');
var port = 3000;
var server = http.createServer(function(req,res){

    console.log(req.headers.cookie);

    res.writeHead(200,{
        'Content-Type':'text/html; charset=UTF-8',
        'Set-Cookie':['num=1','num2=2']
    });
    res.end('Cookie!!');
});

server.listen(port,function(){
    console.log(`Server Listening on port number ${port}`);
});