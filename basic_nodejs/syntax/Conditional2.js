var args = process.argv; //입력받은 값을 배열로 돌려준다..

console.log(args[2]);
console.log('A');
console.log('B');

if(args[2] === '1'){
    console.log('C1');
}else{
    console.log('C2');
}
console.log('D');
