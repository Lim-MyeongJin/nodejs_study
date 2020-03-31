/* 
    GET /admin 관련 url 처리는 이 파일에서 처리

    실습)
    GET /admin
    GET /admin/products
*/

const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.send('contacts 이후 url');
});

router.get('/list',function(req,res){
    res.send('contacts list');
});

module.exports = router;