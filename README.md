Package Manager
=============
> SW를 생성,수정,삭제 등을 관리해주는 프로그램.
> 각각의 컴퓨터 언어와 OS별로 PM들은 굉장히 중요한 역할을 하고 있음. 

NPM
-------------
> 설명달기

PM2
-------------
> PM2는 응용 프로그램을 온라인으로 관리하고 유지하는 데 도움이되는 데몬 프로세스 관리자   
> 설치하기 : npm install pm2 -g
> site: https://pm2.keymetrics.io/

#PM2 사용법   
+ **프로세스 시작**
<pre><code>
 >> pm2 start app.js //앱 실행
</code></pre>

+ **프로세스 시작 옵션**
<pre><code>
 >> pm2 start app.js --watch //코드변경이 일어날 경우 바로 반영
</code></pre>

+ **프로세스 모니어링**
<pre><code>
 >> pm2 monit
</code></pre>

+ **모든 프로세스 보기**
<pre><code>
 >> pm2 list
</code></pre>

+ **프로세스 관리**
<pre><code>
 >> pm2 stop 프로세스이름
 >> pm2 restart 프로세스이름
 >> pm2 delete 프로세스이름
</code></pre>

+ **프로세스 문제점 확인**
<pre><code>
 >> pm2 log
</code></pre>
마크다운 참조링크: https://gist.github.com/ihoneymon/652be052a0727ad59601