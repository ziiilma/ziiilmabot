var http = require('http');
var url = require('url');

const actions = ["move","eat","load","unload"]
const directions = ["up","down","right","left"]

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let response ={}

            //Hive object from request payload
            let hive = JSON.parse(body)

            //Loop through ants and give orders
            for (let antId in hive.ants) {
              let random_act = Math.floor(Math.random() * 4);
              let random_dir = Math.floor(Math.random() * 4);
                response[antId] = {
                  "act":actions[random_act],
                  "dir":directions[random_dir]
                }
            }
            console.log("Orders:",response)
            res.end(JSON.stringify(response));

            // json format sample:
            // {"1":{"act":"load","dir":"down"},"17":{"act":"load","dir":"up"}}
        });
    } else {
        res.end("only POST allowed");
    }
}).listen(7070);
