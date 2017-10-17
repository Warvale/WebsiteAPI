var app = require("./app").app;
var mysql = require('mysql');
var connection = mysql.createConnection(require("./dbconfig"));
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
});
//SELECT * FROM `uhcffa_stats` ORDER BY `uhcffa_stats`.`deaths` DESC
app.get("/leaderboard/:key", (req, res)=>{
    switch(req.params.key) {
        case "kills":
        case "embers":
        case "killstreak":
        case "deaths":
    connection.query(`SELECT * FROM \`uhcffa_stats\` ORDER BY \`uhcffa_stats\`.\`${req.params.key}\` DESC;`, function (error, results, fields) {
        if (error) {
            res.json("internal error!");
            throw error;
        }
        let gonnasend = [];
        for (var i = 0; i < 11; i++) {
            let res = results[i];
            gonnasend.push({uuid:res.uuid,deaths:res.deaths,kills:res.kills,killstreak:res.killstreak,embers:res.embers});
        }
        res.json(gonnasend);
      });
      break;

      default:
      res.json("invalid data type!");
      break;


    }

});
connection.query('USE ffastats;', function (error, results, fields) {
    if (error) throw error;
  });