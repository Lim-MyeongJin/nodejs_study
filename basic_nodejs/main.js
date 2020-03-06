// //지금당장은 이해가 안되겠지만 이걸 이해하는게 저희 수업의 목표!
// var http = require('http');
// var fs = require('fs');
// var app = http.createServer(function(request,response){
//     var url = request.url;
//     if(url == '/'){
//       url = '/index.html';
//     }
//     if(url == '/favicon.ico'){
//       return response.writeHead(404);
//     }
//     response.writeHead(200);
//     response.end(fs.readFileSync(__dirname + url));
//     // response.end('nodejs : '+url);

// });
// //80으로 지정하면 서버의 포트번호를 표현하는 기본값이 80이기 때문에 해당 웹어플리케이션으로 접속할때 포트번호 생략이 가능하다.
// // app.listen(80);
// app.listen(3000);

///////////////////////////////////// url 값 가져오기 예제 ///////////////////////////////////
//require(모듈이름)
// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;

//     console.log(_url);
//     console.log(queryData);
//     console.log(queryData.id);

//     if(_url == '/'){
//       _url = '/index.html';
//     }
//     if(_url == '/favicon.ico'){
//       return response.writeHead(404);
//     }
//     response.writeHead(200);
//     response.end(queryData.id);
// });
// //80으로 지정하면 서버의 포트번호를 표현하는 기본값이 80이기 때문에 해당 웹어플리케이션으로 접속할때 포트번호 생략이 가능하다.
// // app.listen(80);
// app.listen(3000);

// ///////////////////////////////////// url값에 따라 다른 웹페이지 보여주기 /////////////////////////////////////
// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var title = queryData.id;
//     console.log(_url);
//     console.log(queryData);
//     console.log(queryData.id);

//     if(_url == '/'){
//       // _url = '/index.html';
//       title = 'Welcome';
//     }
//     if(_url == '/favicon.ico'){
//       return response.writeHead(404);
//     }
//     response.writeHead(200);
//     var template = `
//     <!doctype html>
//     <html>
//     <head>
//       <title>WEB1 - ${title}</title>
//       <meta charset="utf-8">
//       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//       <script src="colors.js"></script>
//     </head>
//     <body>
//       <h1><a href="/">WEB</a></h1>
//       <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//       <ol>
//         <li><a href="/?id=HTML">HTML</a></li>
//         <li><a href="/?id=CSS">CSS</a></li>
//         <li><a href="/?id=JavaScript">JavaScript</a></li>
//       </ol>
//       <h2>${title}</h2>
//       <p>${}</p>
//     </body>
//     </html>
//     `;

//     response.end(template);
// });
// app.listen(3000);

// ///////////////////////////////////// fs모듈을 활용하여 동적으로 파일읽어들이기 /////////////////////////////////////
// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var title = queryData.id;
//     console.log(_url);
//     console.log(queryData);
//     console.log(queryData.id);

//     if(_url == '/'){
//       // _url = '/index.html';
//       title = 'Welcome';
//     }
//     if(_url == '/favicon.ico'){
//       return response.writeHead(404);
//     }
//     response.writeHead(200);

//     fs.readFile(`nodejs_study/basic_nodejs/data/${title}`,'utf8',function(err,description){
//       var template = `
//       <!doctype html>
//       <html>
//       <head>
//         <title>WEB1 - ${title}</title>
//         <meta charset="utf-8">
//         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//         <script src="colors.js"></script>
//       </head>
//       <body>
//         <h1><a href="/">WEB</a></h1>
//         <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//         <ol>
//           <li><a href="/?id=HTML">HTML</a></li>
//           <li><a href="/?id=CSS">CSS</a></li>
//           <li><a href="/?id=JavaScript">JavaScript</a></li>
//         </ol>
//         <h2>${title}</h2>
//         <p>${description}</p>
//       </body>
//       </html>
//       `;

//       response.end(template);
//     });

// });
// app.listen(3000);

///////////////////////////////////// 조건문 활용  /////////////////////////////////////
// var http = require("http");
// var fs = require("fs");
// var url = require("url");

// var app = http.createServer(function(request, response) {
//   var _url = request.url;
//   var queryData = url.parse(_url, true).query;
//   var pathname = url.parse(_url, true).pathname;

//   //url주소창으로 HTML,CSS,Javascript,/ 이외 다른 값이 들어오는 경우에 대한 처리
//   //console.log(url.parse(_url, true)); //주어진 url정보를 분석해서 객체형태로 돌려준다..
//   //console.log(url.parse(_url, true).pathname);

//   if (pathname === "/") {
//     if (queryData.id === undefined) {
//       fs.readFile(`data/${queryData.id}`,'utf8',function(err, description) {
//           var title = "Welcome";
//           var description = "Hello Node.js!";
//           var template = `
//           <!doctype html>
//           <html>
//           <head>
//             <title>WEB1 - ${title}</title>
//             <meta charset="utf-8">
//             <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//             <script src="colors.js"></script>
//           </head>
//           <body>
//             <h1><a href="/">WEB</a></h1>
//             <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//             <ul>
//               <li><a href="/?id=HTML">HTML</a></li>
//               <li><a href="/?id=CSS">CSS</a></li>
//               <li><a href="/?id=JavaScript">JavaScript</a></li>
//             </ul>
//             <h2>${title}</h2>
//             <p>${description}</p>
//           </body>
//           </html>
//           `;
//           response.writeHead(200);
//           response.end(template);
//         }
//       );
//     } else {
//       fs.readFile(`data/${queryData.id}`,'utf8',function(err, description) {
//           var title = queryData.id;
//           var template = `
//         <!doctype html>
//         <html>
//         <head>
//           <title>WEB1 - ${title}</title>
//           <meta charset="utf-8">
//           <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//           <script src="colors.js"></script>
//         </head>
//         <body>
//           <h1><a href="/">WEB</a></h1>
//           <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//           <ul>
//             <li><a href="/?id=HTML">HTML</a></li>
//             <li><a href="/?id=CSS">CSS</a></li>
//             <li><a href="/?id=JavaScript">JavaScript</a></li>
//           </ul>
//           <h2>${title}</h2>
//           <p>${description}</p>
//         </body>
//         </html>
//         `;
//           response.writeHead(200);
//           response.end(template);
//         }
//       );
//     }
//   } else {
//     response.writeHead(404);
//     response.end("Not found..");
//   }
// });
// app.listen(3000);

///////////////////////////////////// 파일목록 읽어들기  /////////////////////////////////////
// var http = require("http");
// var fs = require("fs");
// var url = require("url");

// var app = http.createServer(function(request, response) {
//   var _url = request.url;
//   var queryData = url.parse(_url, true).query;
//   var pathname = url.parse(_url, true).pathname;

//   if (pathname === "/") {
//     if (queryData.id === undefined) {
//       fs.readdir(`data`, function(err, fileList) {
//         console.log(fileList);

//         var title = "Welcome";
//         var description = "Hello Node.js!";

//         var list = "<ul>";
//         var i = 0;

//         while (i < fileList.length) {
//           list += `<li><a href='/?id=${fileList[i]}'>${fileList[i]}</a></li>`;
//           i = i + 1;
//         }

//         list = list + "</ul>";

//         var template = `
//           <!doctype html>
//           <html>
//           <head>
//             <title>WEB1 - ${title}</title>
//             <meta charset="utf-8">
//             <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//             <script src="colors.js"></script>
//           </head>
//           <body>
//             <h1><a href="/">WEB</a></h1>
//             <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//             ${list}
//             <h2>${title}</h2>
//             <p>${description}</p>
//           </body>
//           </html>
//           `;
//         response.writeHead(200);
//         response.end(template);
//       });
//     } else {
//       fs.readdir(`data`, function(err, fileList) {
//         console.log(fileList);

//         var title = "Welcome";
//         var description = "Hello Node.js!";

//         var list = "<ul>";
//         var i = 0;

//         while (i < fileList.length) {
//           list += `<li><a href='/?id=${fileList[i]}'>${fileList[i]}</a></li>`;
//           i = i + 1;
//         }

//         list = list + "</ul>";

//         fs.readFile(`data/${queryData.id}`, "utf8", function(err, description) {
//           var title = queryData.id;
//           var template = `
//         <!doctype html>
//         <html>
//         <head>
//           <title>WEB1 - ${title}</title>
//           <meta charset="utf-8">
//           <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//           <script src="colors.js"></script>
//         </head>
//         <body>
//           <h1><a href="/">WEB</a></h1>
//           <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//           ${list}
//           <h2>${title}</h2>
//           <p>${description}</p>
//         </body>
//         </html>
//         `;
//           response.writeHead(200);
//           response.end(template);
//         });
//       });
//     }
//   } else {
//     response.writeHead(404);
//     response.end("Not found..");
//   }
// });
// app.listen(3000);


///////////////////////////////////// 파일목록 읽어들기  /////////////////////////////////////
// var http = require("http");
// var fs = require("fs");
// var url = require("url");

// var app = http.createServer(function(request, response) {
//   var _url = request.url;
//   var queryData = url.parse(_url, true).query;
//   var pathname = url.parse(_url, true).pathname;

//   if (pathname === "/") {
//     if (queryData.id === undefined) {
//       fs.readdir(`data`, function(err, fileList) {
//         console.log(fileList);

//         var title = "Welcome";
//         var description = "Hello Node.js!";

//         var list = "<ul>";
//         var i = 0;

//         while (i < fileList.length) {
//           list += `<li><a href='/?id=${fileList[i]}'>${fileList[i]}</a></li>`;
//           i = i + 1;
//         }

//         list = list + "</ul>";

//         var template = `
//           <!doctype html>
//           <html>
//           <head>
//             <title>WEB1 - ${title}</title>
//             <meta charset="utf-8">
//             <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//             <script src="colors.js"></script>
//           </head>
//           <body>
//             <h1><a href="/">WEB</a></h1>
//             <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//             ${list}
//             <h2>${title}</h2>
//             <p>${description}</p>
//           </body>
//           </html>
//           `;
//         response.writeHead(200);
//         response.end(template);
//       });
//     } else {
//       fs.readdir(`data`, function(err, fileList) {
//         console.log(fileList);

//         var title = "Welcome";
//         var description = "Hello Node.js!";

//         var list = "<ul>";
//         var i = 0;

//         while (i < fileList.length) {
//           list += `<li><a href='/?id=${fileList[i]}'>${fileList[i]}</a></li>`;
//           i = i + 1;
//         }

//         list = list + "</ul>";

//         fs.readFile(`data/${queryData.id}`, "utf8", function(err, description) {
//           var title = queryData.id;
//           var template = `
//         <!doctype html>
//         <html>
//         <head>
//           <title>WEB1 - ${title}</title>
//           <meta charset="utf-8">
//           <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//           <script src="colors.js"></script>
//         </head>
//         <body>
//           <h1><a href="/">WEB</a></h1>
//           <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
//           ${list}
//           <h2>${title}</h2>
//           <p>${description}</p>
//         </body>
//         </html>
//         `;
//           response.writeHead(200);
//           response.end(template);
//         });
//       });
//     }
//   } else {
//     response.writeHead(404);
//     response.end("Not found..");
//   }
// });
// app.listen(3000);


///////////////////////////////////// 함수활용  /////////////////////////////////////
var http = require("http");
var fs = require("fs");
var url = require("url");

function templateHTML(title, list, body){
  return  `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="colors.js"></script>
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    <input id="night_day" type="button" value="night" onclick="nightDayHandler(this);">
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templateList(fileList) {
  var list = "<ul>";
  var i = 0;

  while (i < fileList.length) {
    list += `<li><a href='/?id=${fileList[i]}'>${fileList[i]}</a></li>`;
    i = i + 1;
  }

  list = list + "</ul>";
  return list;
}

var app = http.createServer(function(request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir(`data`, function(err, fileList) {
        var title = "Welcome";
<<<<<<< Updated upstream
        var description = "Hello Node.js!!!!!!!!";
=======
        var description = "Hello Node.js!!!!!!";
>>>>>>> Stashed changes
        var list = templateList(fileList);
        var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir(`data`, function(err, fileList) {
        fs.readFile(`data/${queryData.id}`, "utf8", function(err, description) {
          var title = queryData.id;
          var list = templateList(fileList);
          var template = templateHTML(title,list, `<h2>${title}</h2><p>${description}</p>`);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found..");
  }
});
app.listen(3000);

