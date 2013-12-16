var express = require("express"),
    path = require('path'),
    fs = require('fs'),
    app = express();

// Configuration
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/'));
    app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});

app.get('/api/v1/dealing', function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    fs.createReadStream(__dirname + '/test/testData.json').pipe(res);
});

var port = process.env.PORT || 3002;
app.listen(port, function () {
    console.log("Listening on " + port);
});

/*

 var http = require('http'),
 fs = require('fs');

 http.createServer(createHandler()).listen(3001);

 function createHandler() {
 return function (req, res) {
 if (req.url === '/api/v1/dealing') {
 res.writeHead(200, {'Content-Type': 'application/json'});
 fs.createReadStream(__dirname + '/testData.json').pipe(res);
 } else {
 res.end('error');
 }
 };
 }*/
