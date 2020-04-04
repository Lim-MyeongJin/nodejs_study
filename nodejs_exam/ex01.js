const http = require('http');

const server = http.createServer(function(req,res){

    res.statusCode = 200;
    res.setHeader('Content-Type','text/html'); //json, xml, media etc.. --  MIME Type : 어떠한 타입의 데이터를 보낼껀지 설정

    console.log('서버 실행!');
    res.write('Hello Node.js!'); //클라이언트에게 보낼 응답데이터를 header의 body에 작성
    //res.write(); //이런식으로 write()를 계속 사용할 수 있으며 응답데이터를 계속 추가작성 할 수 있다.
    res.end(); //응답종료(요청의 처리가 완료)
    
})

const port = 3000;

server.listen(port, function(){
    console.log(`Server running ap port ${port}`);
});