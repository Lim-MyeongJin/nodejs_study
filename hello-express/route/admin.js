/* 
    GET /admin 관련 url 처리는 이 파일에서 처리

    실습)
    GET /admin
    GET /admin/products
*/

const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.send('admin 이후 url');
});

router.get('/products',function(req,res){
    res.send('admin products');
});

module.exports = router;