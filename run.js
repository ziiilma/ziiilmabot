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

            //Hive object from request payload
            let hive = JSON.parse(body)

            let response ={}

            //Loop through ants and give orders
            for (let antId in hive.Ants) {
                let random = Math.floor(Math.random() * 4);
                response[antId] = {
                  "act":actions[random],
                  "dir":directions[random]
                }
            }
            console.log("Orders:",response)
            res.end(JSON.stringify(response));
        });
    } else {
        res.end("only POST allowed");
    }
}).listen(7070);
