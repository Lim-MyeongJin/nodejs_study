'use strict';

const express = require('express');
const app = express();
const port = 3000;

const boardRouter = require('./routes/board');
const membersRouter = require('./routes/members');

app.use('/board',boardRouter);
app.use('/members',membersRouter);

app.get('/',function(req,res){
    res.send('Hello Express!');
});

app.listen(port, function(){
    console.log(`Express app listening on port ${port}`);
});