
/*
    만약 이 객체들이 많아진다면?
    객체, 또는 함수가 많아진다면 이를 다시 우리는 관리하기 편하게 정리정돈해야 한다.
    이를 모듈이라 하고 파일단위로 만들어서 관리할 수 있다.

    모듈화 과정
    1.아래 코드 카피해서 mpart.js로 옮기기
    2.module.exports = 객체이름
    3.require()을 이용해서 방금 추가한 모듈 불러오기
*/

var calculator = {
    add:function(a,b){
        console.log(a+b);
    },
    minus:function(a,b){
        console.log(a-b);
    }
}
calculator.add(1,2);
calculator.minus(1,2);


var cal = require('./cal_module.js');

console.log(cal);
cal.add(1,2);
cal.minus(1,2);
// part.f();
