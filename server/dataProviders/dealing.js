var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    when = require('when');

exports.getAll = function () {
    var deferred = when.defer();
    MongoClient.connect("mongodb://localhost:27017/transformer", function (err, db) {
        if (err) {
            deferred.reject(err);
        }
        var collection = db.collection('dealing');
        collection.find().toArray(function (err, items) {
            deferred.resolve(items);
        });
    });
    return deferred.promise;
};

exports.getById = function (id) {
    var deferred = when.defer();
    MongoClient.connect("mongodb://localhost:27017/transformer", function (err, db) {
        if (err) {
            deferred.reject(err);
        }
        var collection = db.collection('dealing');
        collection.findOne({_id: id}, function (err, item) {
            deferred.resolve(item);
        });
    });
    return deferred.promise;
}

