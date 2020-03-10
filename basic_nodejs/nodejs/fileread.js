var fs = require('fs');
/*
fs.readFile('./sample.txt',function(err,data){
    console.log(data);
});
*/

//버퍼 -> 문자열1
fs.readFile('./sample.txt',function(err,data){
    console.log(data.toString());
});
//버퍼 -> 문자열2
fs.readFile('./sample.txt','utf8',function(err,data){
    console.log(data);
});

