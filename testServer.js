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

var port = process.env.PORT || 3003;
app.listen(port, function () {
    console.log("Listening on " + port);
});
