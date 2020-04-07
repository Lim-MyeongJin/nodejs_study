HTTP Cookie
 쿠키정보를 다루기 쉽도록 객체로 변환시켜주는 모듈설치 (CRUD)
 >>npm install -s cookie

 쿠키 유효기간
 Session : 브라우저를 종료했다가 접속하면 세션이 없어져 있음
 Permanent : 브라우저를 종료했다가 접속해도 살아남아 있음
  < 쿠키 유효기간 설정 >
  - expire : 만료 날짜
  - max-age : 만료 기간

  < 쿠키를 훔쳐가는 행위를 막기 위한 방법 >
  - secure : 웹브라우저와 웹서버가 https로 통신하는 경우만 웹브라우저가 쿠키를 서버로 전송하는 옵션
  - httponly : 자바스크립트로 쿠키를 훔치는 걸 방지하기 위한 보안속성

  < 쿠키 사용범위(Scope) 설정 >
  - path : 특정 위치에서만 사용
  - domain : 호스트
