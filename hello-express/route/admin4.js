const express = require("express");
const router = express.Router();

function testMiddleware(req, res, next) {
    console.log('첫번째 미들웨어');
    next(); //미들웨어 처리 후 제어권 넘기기
}
function testMiddleware2(req, res, next) {
  console.log('두번째 미들웨어');
  next(); //미들웨어 처리 후 제어권 넘기기
}

//실무
function loginRequired(req,res,next){
  if(true){
    res.redirect('/contacts');
  }else{
    next();
  }
}

//실행순서
// '/'접속 -> testMiddleware실행 -- next()로 제어권넘기기 --> function(req,res){} 실행
router.get("/", testMiddleware, testMiddleware2, function(req, res) {
  res.send("admin 이후 url");
});

router.get("/products", function(req, res) {
  // res.send('admin products');
  // template을 화면에 보여주는 기능: render()
  res.render("admin/products.html", {
    message: "Hello Nunjucks!!!",
    outline: "express",
    test: "<h1>태그 출력</h1>"
  });
});

router.get('/products/write', function(req,res){
  res.render('admin/write.html');
});

router.post('/products/write', function(req,res){
  // res.send('1234');
  // res.send(req.body.price);
  res.send(req.body); //form태그 내 모든 데이터를 JSON구조로 변홚하여 반환 
});

module.exports = router;
