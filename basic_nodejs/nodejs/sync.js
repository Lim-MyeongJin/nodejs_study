var fs = require('fs');
/*
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt','utf-8');
console.log(result);
console.log('C');
*/

console.log('A');

/*
    node.js에게 너가 가지고 있는 readFile라는 기능을 이용해서 sample2.txt 파일을 읽어와
    그런데 시간이 좀 걸리니까 작업이 끝난 다음에 내가 너한테 전달한 3번째 인자인 함수를 실행시켜!
    
    그러면 node.js는 파일을 읽은 후에 함수를 실행시키게 될꺼에요. 그리고 함수 내 작성한 작업들이 처리되게 된다라는 거죠.
    이것이 바로 Callback입니다..

    그럼 저희도 callback을 만들어봅시다.
*/
var result = fs.readFile('nodejs/sample2.txt','utf-8',function(err, result){
    console.log(result);
});
console.log('C');

//동기 vs 비동기 차이
//Node.JS의 성능을 제대로 끌어올리기 위해서는 반드시 비동기적인 작업을 해야 한다.
