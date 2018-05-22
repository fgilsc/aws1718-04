'use strict';

var MongoClient = require('mongodb').MongoClient;
var db;
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
var User = function(params) {
    this.username = params.username;
    this.email = params.email;
    this.password = params.password;
};

User.prototype.validPassword = function(password) {
    return this.password == password;
};

var Users = function () {};

Users.prototype.connectDb = function(callback) {
    MongoClient.connect(mongoUrl, function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.db('aws1718-04').collection('users');
        
        callback(err, database);
    });
};

Users.prototype.findOne = function(user, callback) {
    return db.findOne(user, function(err, item) {
        if (err) {
            callback(err);
        } else {
            if (item && item != null) {
                callback(err, new User(item));
            } else {
                callback(err, null);
            }
        }
    });
};

module.exports = new Users();