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
    // res.send('admin products');
    // template을 화면에 보여주는 기능: render()
    res.render('admin/products.html',{
        message:'Hello Nunjucks!!!',
        outline :'express',
        test:'<h1>태그 출력</h1>',
    });
});

module.exports = router;