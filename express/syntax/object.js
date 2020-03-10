var members = ['lala','justin','may'];

//배열은 인덱스로 데이터 접근
//console.log(members[1]);

//반복문 활용
// for(var i=0; i<members.length; i++){
//     console.log(members[i]);
// }


var roles = {
    programmer:'lala',
    desinger:'justin',
    manager:'may'
};

//배열과는 다르게 객체는 데이터에 이름을 정해줄 수 있다.
console.log(roles.programmer);
console.log(roles.desinger);
console.log(roles['manager']);

//반복문 활용
for(var name in roles){
    //roles의 속성값을 name에 대입하면 string타입으로 저장
    console.log('object => ', name, 'value =>', roles[name]);
}