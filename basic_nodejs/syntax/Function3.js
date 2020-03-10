///////////////////// Function Output ///////////////////// 
//아래와 같은 함수는 출력하기 위해서 console.log안에 넣어야만이 출력되기 때문에
//다소 불편해보일 수 있고 우리가 만든 sum()이 더 좋아보일 수 있지만,
//우리가 만든 sum()함수는 융통성이 부족.. Math.round()처럼 순수하게 값으로만 출력할 수 있다면
//활용도고 높아지게 된다..

function sum(first, second){ 
    //console.log(first+second);
    console.log('a');
    return first+second; //출력과 동시에 프로그램 종료..
    console.log('b'); //실행되지 않음..
}
sum(2,4); //함수의 실행을 멈추고 그 즉시, return 뒤에 따라오는 값을 출력해주면서 6으로 만들어준다..

console.log(Math.round(1.6));
// filewrite('result.txt',Math.round(1.6));
// email('smhrd@smhrd.or.kr',Math.round(1.6));

console.log(sum(2,4));