/* 1
    다시 정리하면, 함수는 관련된 작업을 그룹핑하는 구문이면서도 값이 될 수 있다는 것이고 배열과 객체에 담을 수 있다는 것입니다.
    그런데, 값으로서 함수를 배열에 담는 대신 객체에 많이 담아서 사용합니다. 객체에는 이름이 있기 때문에 우리가 담은 함수를 이름으로 
    접근이 가능하다는 것이죠. 그러면 우리가 객체에 담았을 때 어떤 장점이 있는지를 한 번 살펴보도록 할께요.
*/

/*
    코드가 1억줄되는 코드예제 상상!
*/

var name = 'Justin';
//10000 code
// name = 'smart' 로 변경
var age = '25';

function namePrint(){
    console.log(name);
}

//신입개발자가 필요해서 namePrint()를 선언해서 사용
//이렇게 다시 선언해서 사용하면 위에서 사용하고자 하는 코드가 무용지물..
/*
    function namePrint(){
        console.log(name+'입니다.');
    }
*/

function agePrint(){
    console.log(age);
}

console.log(name);
console.log(age);

namePrint();
agePrint();

//위 불편한 상황들을 해결할 수 있는게 바로 객체!
//관련있는 데이터와 함수를 담으면 불편한 상황의 발생률이 줄어든다.
//복잡한 코드를 좀더 간소화 시킬 수 있다.
var person = {
    name:'Justin',
    age:'25',
    namePrint:function(){
        console.log(this.name);
    },
    agePrint:function(){
        console.log(this.age);
    }
}

person.namePrint();
person.agePrint();