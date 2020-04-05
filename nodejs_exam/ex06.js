const http = require('http');
const url = require('url'); //요청한 주소를 분석하기 위한 모듈
const port = 3000;

const server = http.createServer(function(req,res){

    let req_url = req.url;
    let description = '';
    let html = '';
    console.log(req_url);

    if(req_url === '/'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        description = 'Main page..';
        
    }else if(req_url === '/hello'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        description = 'Hello Node.js!';
    }
    
    html = `
    <html>
        <head>
            <title>Node.js</title>
        </head>
        <body>
            <h1>${description}</h1>
        </body>
    </html>
    `

    res.end(html);

});

server.listen(port, function(){
    console.log(`Server running ap port ${port}`);
});