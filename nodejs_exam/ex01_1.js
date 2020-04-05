const http = require('http');
const server = http.createServer((request, response) => {
   
    request.on('error', (err) => { // 요청에 에러가 있으면
      console.error(err);
    });

    request.on('data', (data) => { // 요청에 데이터가 있으면
      console.log(data);
    });

    request.on('end', () => { // 요청의 데이터가 모두 받아졌으면
      response.on('error', (err) => { // 응답에 에러가 있으면
        console.error(err);
    });
      
      response.statusCode = 200; // 성공 상태 코드
      response.setHeader('Content-Type', 'text/plain'); // header 설정
      response.write('h1i\n'); // body에 정보 탑재
      response.end('the end!'); // 정보 탑재 후 브라우저로 전송
    });
});
server.listen(3000);