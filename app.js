var express = require("express"),
    path = require('path'),
    routes = require('./server/routers').router,
    init = require('./server/routers').init,
    app = express();

// Configuration
app.configure(function () {
    app.set('views', path.join(__dirname, '/app'));
    app.use(express.bodyParser());
    app.use(express.logger());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});

routes(app);
init(true);

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("Listening on " + port);
});
