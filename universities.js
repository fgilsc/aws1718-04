'use strict';

var MongoClient = require('mongodb').MongoClient;
var db;

var Universities = function () {}; 

Universities.prototype.connectDb = function(callback){
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.db('aws1718-04').collection('universities');
        
        callback(err, db);
    });
};




Universities.prototype.allUniversities = function(callback){
    return db.find({}).toArray(callback);
};

Universities.prototype.add = function(university,callback){
    return db.insert(university,callback);
};

Universities.prototype.removeAll = function(callback){
    return db.remove({},{multi: true},callback);
};

Universities.prototype.get = function(name,callback){
    return db.find({name:name}).toArray(callback);
};

Universities.prototype.remove = function(name,callback){
    return db.remove({name:name},{multi: true},callback);
};

Universities.prototype.update = function(name, updatedUniversity,callback){
    return db.update({name:name},updatedUniversity,{},callback);
};

module.exports = new Universities();

