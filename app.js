/*
This is a really tiny micro-service.

And, the one and only route: GET /news
*/
const express = require('express');
const app = express();
var news = require("./news.json");
setInterval(()=>{
news = reload("./news.json");
}, 1000*60*5);

app.get('/news', (req, res)=>{
  res.json(news);
});

app.listen(3080);