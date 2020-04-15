const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.send('<h1>게시판 메인</h1>');
});

router.get('/page',function(req,res){
    res.send('<h1>게시판 상세 페이지</h1>');
});

router.get('/page/update',function(req,res){
    res.send('<h1>게시판 수정 페이지</h1>');
});

module.exports = router;