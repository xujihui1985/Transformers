var express = require("express"),
	mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;
 
var app = express();
app.use(express.logger());

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/app');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
});

app.get('/', function(request, response) {
  response.render('index.html')
});

var server = new Server('mongodb://xujihui1985:C8i0s4c8o6@ds029107.mongolab.com:29107',29107,{auto_reconnect: true});
var db = new Db('datacenter',server );

// db.open(function(err, db) {
//     if(!err) {
//         console.log("Connected to database");
//     }else{
//     	console.log("error");
//     }
// });

app.get('/deals', function(request, response) {
	db.collection('products', function(err, collection) {
        collection.find().toArray(function(err, items) {
            response.json(items);
        });
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
