const http = require('http');

const server = http.createServer(function(req,res){
    console.log('서버 실행!');
    console.log(req.headers);  
    console.log(req.headers['host']);

    //접속자 ip 가져오기
    //x-forwarded=for - ip주소를 식별하기 위한 표준헤더
    let remoteAddress = req.headers['x-forwarded=for']||req.connection.remoteAddress;
    let array = remoteAddress.split(':')
    let remoteIP = array[array.length-1]

    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); //헤더정보를 응답에 작성해서 내보낸다.
    res.write(remoteIP);
    res.end();

})

server.listen(port, function(){
    console.log(`Server running ap port ${port}`);
});