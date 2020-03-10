/*
    먼저 얘기하자면, callback이라는 개념이 조금 어려울 수 있습니다..
    그리고 이걸 이해못한다고 앞으로 배울 것들을 못하는 것은 아니니 
    우리는 이 개념에 대해 익숙해져보도록 하자는 거죠.
    익숙해지다보면 어느 순간 이해할 수 있게 됩니다.
*/

/*
function a(){
    console.log('A');
}
*/

/*
    이름이 없는 함수: 익명함수
    이름이 없으면 호출할 수 없으니 변수를 선언해서 값으로서 정의할 수 있다.
*/
var a = function(){
    console.log('A');
}

// 실행시키면 똑같이 'A'가 출력
// a();

/*
    그러면 이번엔 굉장히 오래걸리는 slowfunc()기능이 있다라고 상상해봅니다.
    그러면 이 기능에 대한 실행이 끝난 다음 이 기능을 실행한 쪽에게
    '함수가 실행이 끝났으니 그 다음 일을 하세요!'라고 하고 싶다면
    slowfunc()가 매개변수로 callback을 받으면 됩니다.
    그리고 이 callback을 실행하면 됩니다.
*/
function slowfunc(callback){
    callback();
}

/* 
    이 함수가 실행되면 slowfunc()안에 있는 매개변수는 a변수가 갖고 있는 익명함수를 
    갖게 되고 이걸 호출하면 익명함수가 가진 console.log('A'); 가 실행될꺼에요.
    바로 이것이 callback입니다.
    이해가 안될 수 있지만, 이런 개념이다! 라는 정도만 이해하도록 합시다.
*/

slowfunc(a);
