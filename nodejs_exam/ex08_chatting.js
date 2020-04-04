const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(req,res){
    
    let parse = url.parse(req.url,true);
    let path = parse.pathname;
    let data = parse.query.data;

    if(req.method === 'GET'){
        if(path === '/'){
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});

            fs.readFile(`${__dirname}/html/ex07_chatting.html`,function(error, html){
                if(error){
                    return console.log(error);
                }
                res.end(html);
            });
        }
    }else if(req.method === 'POST'){
        if(path === '/chat_process'){
            let body = '';

            req.on('data',function(data){
                //바이너리형태 데이터 읽어옴
                body += data.toString();
            })

            req.on('end',function(){
                let queryData = qs.parse(body);
                let user = queryData.user;
                let talk = queryData.talk;
                console.log(user,':',talk);
            });
        }
    }

});

server.listen(port, function(){
    console.log(`Server running ap port ${port}`);
});