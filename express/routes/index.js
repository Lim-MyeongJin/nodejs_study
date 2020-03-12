const express = require('express');
const router = express.Router();
const template = require('../lib/template');


router.get("/", function(request, response) {
    var title = "Welcome";
    var description = "Hello Node.js!!!!!!!!";
    var list = template.list(request.list);
    var html = template.html(title, list,
      `
        <h2>${title}</h2><p>${description}</p>
        <img src="/images/hello.jpg" style="width:200px;">
      `,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);
});

module.exports = router;