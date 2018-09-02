var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  if (req.method === 'POST') {
    let hive = {};
    let body = '';
    let ActDir
      req.on('data', chunk => {
          body += chunk.toString();
      });
      req.on('end', () => {
          hive = JSON.parse(body)
          ActDir = {}
          for(var antID in hive.Ants) {
            var randomDirection = Math.floor(Math.random() * 4);
            ActDir[antID] = 10+randomDirection

            console.log(antID+" move to "+randomDirection)
          }
          res.end(JSON.stringify(ActDir));
      });
    } else {
      res.end("only POST allowed");
    }
}).listen(7070);
