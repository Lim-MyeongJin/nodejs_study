//정보시스템의 핵심 -> CRUD <- 배열
//배열은 대괄호로 시작해서 대괄호로 끝나는 구조
//0부터 데이터의 자리수가 결정..
var arr = ['A','B','C','D']; //Create

console.log(arr[2]); //Read
console.log(arr[3]);

//C -> c로 수정
arr[2] = 'c';

console.log(arr[2]); //Update

//길이확인
console.log(arr.length);

//데이터 추가
arr.push('E');

console.log(arr);

arr.pop();

console.log(arr); //Delete
