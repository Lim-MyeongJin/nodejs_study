//프로그램을 만들다보면 반복적으로 실행해야 하는 경우가 발생
// console.log('A');
// console.log('B');
// console.log('C1');
// console.log('C2');
// console.log('C1');
// console.log('C2');
// console.log('C1');
// console.log('C2');
// console.log('C1');
// console.log('C2');
// ...
// console.log('D');


//반복문의 종류: while, do~while, for
console.log('A');
console.log('B');

//true로 고정되면 무한루프가 동작해서 프로그램이 종료되지 않는다..
//그래서 반드시 멈추는 조건이 필요..
var i=0;
while(i < 2){ 
    console.log('C1');
    console.log('C2');

    i = i + 1;
}
console.log('D');