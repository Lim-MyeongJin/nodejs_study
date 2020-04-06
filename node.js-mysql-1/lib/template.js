var sanitizeHTML = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${sanitizeHTML(topics[i].id)}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }, authorSelect:function(authors){
    var tag = '';

    for (var i = 0, len = authors.length; i < len; i++) {
      tag += `<option value="${authors[i].id}">${sanitizeHTML(authors[i].name)}</option>`;
    }

    return `<select name="author">
              ${tag}
            </select>`;
  }, authorTable:function(authors){
    var tags = ``;

    for (var i = 0, len = authors.length; i < len; i++) {
      tags += `
          <tr>
            <td>${sanitizeHTML(authors[i].name)}</td>
            <td>${sanitizeHTML(authors[i].profile)}</td>
            <td><a href="/author/update?id=${authors[i].id}">update</a></td>
            <td>
              <form action="/author/delete_process" method="post">
                <input type="hidden" name="id" value="${authors[i].id}">
                <input type="submit" value="delete">
              </form>
            </td>
          </tr>
      `;
    }
      
    return `
          <table border="1" cellspacing="0">
            <tr>
              <td>name</td>
              <td>profile</td>
              <td>update</td>
              <td>delete</td>
            </tr>
            ${tags}
          </table>
    `;

  }
}
