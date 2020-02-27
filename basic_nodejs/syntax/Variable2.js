
var letter = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint consequatur rerum error modi nihil! Voluptatum omnis amet consectetur neque voluptatibus? Aliquid, quibusdam dolore! Non incidunt dolorem aperiam praesentium recusandae cupiditate.'; 

//1.가독성 향상
console.log(letter);

//2.중복제거
//이름넣는 부분이 만약 1억개라면.. 전부다 고치기엔 엄청난 노력이 필요..
//하지만, 변수를 활용한다면 name이라는 변수에 값이 저장되어 있기 때문에 한번에 변경이 가능해진다.
var name = 'justin'
var letter2 = 'Dear '+name+' Lorem, ipsum dolor sit amet consectetur adipisicing elit. '+
             'Sint consequatur rerum error modi nihil! '+name+' Voluptatum omnis amet consectetur neque voluptatibus?'+
             'Aliquid, quibusdam dolore! '+name+' Non incidunt dolorem aperiam praesentium recusandae cupiditate.'; 

console.log(letter2);

//중복을 제거하면 좋은 코드가 될 수 있다..
