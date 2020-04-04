const http = require('http');

const server = http.createServer(function(req,res){
    
    console.log('서버 실행!');
    
    //접속자 ip 가져오기
    //x-forwarded=for - ip주소를 식별하기 위한 표준헤더
    let remoteAddress = req.headers['x-forwarded=for']||req.connection.remoteAddress;
    let array = remoteAddress.split(':');
    let remoteIP = array[array.length-1];

    if(remoteIP === '172.30.1.53'){
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.write('강사님 환영합니다.');
    }else{
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.write('손님 환영합니다.');
    }
    res.end();

});

server.listen(port, function(){
    console.log(`Server running ap port ${port}`);
});