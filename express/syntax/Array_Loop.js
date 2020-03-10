//반복문과 배열을 각자 놓고보면 의미가 없지만 같이 활용한다면 엄청난 효과를 발휘한다..
//1억개의 데이터..상상
var number = [1,400,12,34,5];

//배열 내 모든 데이터 더하기
var i=0;
var total=0;

//정적으로 데이터의 갯수를 지정하면 여러 문제가 발생..
//동적으로 데이터의 갯수를 가져오면 해결..
while(i < number.length){
    console.log(number[i]);
    total = total + number[i];
    i = i + 1;
}

console.log(total);

//반복문을 같이 활용하면 대규모의 데이터를 쉽게 처리할 수 있게 된다..