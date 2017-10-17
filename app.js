/*
This is a really tiny micro-service.

Routes:
GET /news Returns some json which is the news.
GET /players Returns a number of players on warvale. Updates every 30 seconds.
GET /leaderboard
*/
const express = require('express');
const app = express();
var news = require("./news.json");
var players = -1; // Just as a default value before we ping the server.
setInterval(()=>{
news = reload("./news.json");
}, 1000*60*5);

app.get('/news', (req, res)=>{
  res.json(news);
});

app.get("/players",(req,res)=>{
res.json(players);
});

app.listen(3080);

function ping(){
require('minecraft-ping').ping_fe01fa({host:'warvale.net', port:25565}, function(err, response) {
  if (err) console.error(err);
  players = response.playersOnline;
});

}

ping();

setInterval(ping, 1000*30);

exports.app = app;
require("./leaderboard");