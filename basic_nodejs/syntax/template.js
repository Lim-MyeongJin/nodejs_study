var name = 'justin'

//줄바꿈을 해줘야 한다면 '\n'과 같은 특수문자를 넣어줘야 가능해짐 
//이런 특수문자들이 많이 들어가면 데이터를 다루는데 굉장히 불편해짐..
var letter2 = 'Dear '+name+' \nLorem, ipsum dolor sit amet consectetur adipisicing elit. \n'+
             'Sint consequatur rerum error modi nihil!\n'+name+' Voluptatum omnis amet consectetur neque voluptatibus?\n'+
             'Aliquid, quibusdam dolore!\n'+name+' Non incidunt dolorem aperiam praesentium recusandae cupiditate.'; 

console.log(letter2);


//이런 불편함에 대한 해결책은 template literal -> grave accent ( ` )
var a = `1
2아
이
우
`;

console.log(a);

//특수기호를 쓰지 않아도 되는 장점
//변수의 값을 반영할 때 ${데이터} <- 정해진 약속
var letter3 = `Dear ${name} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
Sint consequatur rerum error modi nihil! 
${name} Voluptatum omnis amet consectetur neque voluptatibus?
Aliquid, quibusdam dolore! 
${1+1} Non incidunt dolorem aperiam praesentium recusandae cupiditate.`; 

console.log(letter3);