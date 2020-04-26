const express = require('express');
const app = express(); //express app생성
const port = 3000;

app.get('/boardList', (req, res) => {
  res.send('<h1>boardList 페이지!</h1>');
});

app.get('/boardWrite', (req, res) => {
  res.send('<h1>boardWrite 페이지!</h1>');
});

app.get('/boardUpdate', (req, res) => {
  res.send('<h1>boardUpdate 페이지!</h1>');
});

app.get('/boardDelete', (req, res) => {
  res.send('<h1>boardDelete 처리</h1>');
});

app.listen(port, () => {
  console.log(`${port}번 포트에 http server를 띄웠습니다.`);
});
