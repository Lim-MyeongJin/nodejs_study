const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function(req,res){
    
    let parse = url.parse(req.url,true);
    let path = parse.pathname;
    let data = parse.query.data;

    console.log(req.method);
    console.log(path);

    if(req.method === 'GET'){
        if(path === '/'){
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});

            fs.readFile(`${__dirname}/html/ex06_post.html`,function(error, html){
                if(error){
                    return console.log(error);
                }
                res.end(html);
            });

        }else if(path === '/data_process'){
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            res.end(`전달받은 값>> ${data}`);
        }else{
            res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
            res.end('<h1>해당 페이지는 존재하지 않습니다..</h1>','utf-8');

        }
    }else if(req.method === 'POST'){
        if(path === '/data_process'){
            let body = '';

            req.on('data',function(data){
                //바이너리형태 데이터 읽어옴
                console.log(data.toString());
                body += data.toString();
            })

            req.on('end',function(){
                console.log(qs.parse(body));
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                res.end(`전달받은 값>> ${qs.parse(body).data}`);
            });
        }
    }

});

server.listen(port, function(){
    console.log(`Server running ap port ${port}`);
});