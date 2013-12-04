var site = require('./controllers/site'),
    dealing = require('./controllers/dealing'),
    MongoClient = require('mongodb').MongoClient;

module.exports = {
    router: function (app) {
        //home
        app.get('/', site.index);

        //dealing
        app.get('/api/dealing', dealing.getAll);
        app.get('/api/dealing/:id', function (req, res, next) {
            req.params.id = parseInt(req.params.id, 10);
            next();
        }, dealing.getById)
    },

    init: function (refresh) {
        if (refresh) {
            MongoClient.connect("mongodb://localhost:27017/transformer", function (err, db) {
                db.dropDatabase(function (err, result) {
                    db.dropCollection('dealing', function (err, result) {
                        var collection = db.collection('dealing');
                        collection.insert({_id: 1, description: 'moneymarket'}, {w: 1}, function (err, result) {
                        });
                        collection.insert({_id: 2, description: 'foreignexchange'}, {w: 1}, function (err, result) {
                        });
                        collection.insert({_id: 3, description: 'futures'}, {w: 1}, function (err, result) {
                        });
                    });
                });
            });
        }
    }

};