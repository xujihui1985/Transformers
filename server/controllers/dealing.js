var dataProvider = require('../dataProviders/dataProvider');

exports.getAll = function (req, res, next) {
    dataProvider.dealing.getAll().then(function(items){
        res.json(items);
    });
}

exports.getById = function (req, res, next) {
    dataProvider.dealing.getById(req.params.id).then(function(item){
        res.json(item);
    });
}