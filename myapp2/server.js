const express = require('express');
const app = express(); //express app생성
const port = 3000;

// route:길, 노선
// routing: 여정, 절차의 결정, 전달 (사전적인 의미)
// --> 클라이언트의 요청과 그 요청에 맞는 처리를 결정하는 것
// --> 사용자가 접근하는 웹 페이지
// --> 라우팅을 설정해줘야 페이지에 접근이 가능

// http://localhost:3000
app.get('/', (req, res) => {
  res.send('Express로 여러분들의 서버가 실행되었습니다!');
});

// http://localhost:3000/test
app.get('/test', (req, res) => {
  res.send('<h1>test 페이지!</h1>');
});

// http://localhost:3000/member
app.get('/member', (req, res) => {
  res.send('<h1>member 페이지!</h1>');
});

// http://localhost:3000/board
app.get('/board', (req, res) => {
  res.send('<h1>board 페이지!</h1>');
});

app.listen(port, () => {
  console.log(`${port}번 포트에 http server를 띄웠습니다.`);
});
