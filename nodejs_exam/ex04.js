const http = require('http');
const url = require('url');
const port = 3000;

const server = http.createServer(function(req,res){

    let req_url = req.url;

    console.log(req_url);

    if(req_url === '/'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        console.log('Main page..');
    }else if(req_url === '/hello'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        console.log('Hello Node.js!');
    }

    res.end();

});

server.listen(port, function(){
    console.log(`Server running ap port ${port}`);
});