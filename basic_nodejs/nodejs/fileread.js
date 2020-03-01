var fs = require('fs');

fs.readFile('nodejs_study/basic_nodejs/nodejs/sample.txt','utf8',function(err,data){
    console.log(data);
});