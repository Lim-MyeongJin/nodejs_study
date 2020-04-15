'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.get('/',function(req,res){
    res.send('Hello Express!');
});

app.get('/admin',function(req,res){
    res.send('Hello Admin!');
});

app.get('/board',function(req,res){
    let query = req.query;

    res.send(`Date: ${query.targetDt}
              <br>board ${query.pageNo} Page!`);
});

app.listen(port, function(){
    console.log(`Express app listening on port ${port}`);
});