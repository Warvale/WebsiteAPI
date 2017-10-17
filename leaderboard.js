var app = require("./app").app;
var mysql = require('mysql');
var connection = mysql.createConnection(require("./config"));
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
});
//SELECT * FROM `uhcffa_stats` ORDER BY `uhcffa_stats`.`deaths` DESC
app.get("/leaderboard/:key", (req, res)=>{
    switch(req.params.key) {
    
        case "deaths":
    connection.query(`SELECT * FROM \`uhcffa_stats\` ORDER BY \`uhcffa_stats\`.\`${req.params.key}\` DESC;`, function (error, results, fields) {
        if (error) {
            res.json("internal error!");
            throw error;
        }
        res.json({results:results,fields:fields});
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