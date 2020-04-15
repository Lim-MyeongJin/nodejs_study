const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.send('<h1>회원 목록 페이지</h1>');
});

router.get('/update',function(req,res){
    res.send('<h1>회원정보 수정 페이지</h1>');
});

module.exports = router;