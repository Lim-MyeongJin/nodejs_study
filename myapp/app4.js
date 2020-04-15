'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.get('/',function(req,res){
    res.send('Hello Express!');
});

app.get('/numberSum',function(req,res){
    let query = req.query;
    let html = `<h1>${query.start}~${query.end}까지의 합</h1>`;
    let sum = 0;

    for(let i=query.start; i<=query.end; i++){
        sum += Number(i);    
    }
    html += `결과: ${sum}`;

    res.send(html);
});

app.listen(port, function(){
    console.log(`Express app listening on port ${port}`);
});