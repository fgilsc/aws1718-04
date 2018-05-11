'use strict';

var path = require('path');
var DataStore = require('nedb');
var dbFileName = path.join(__dirname, 'universities.json');

var db = new DataStore({
    filename : dbFileName,
    autoload : true
});


var Universities = function () {};

Universities.prototype.allUniversities = function(callback){
    return db.find({},callback);
};

Universities.prototype.add = function(university,callback){
    return db.insert(university,callback);
};

Universities.prototype.removeAll = function(callback){
    return db.remove({},{multi: true},callback);
};

Universities.prototype.get = function(name,callback){
    return db.find({name:name},callback);
};

Universities.prototype.remove = function(name,callback){
    return db.remove({name:name},{multi: true},callback);
};

Universities.prototype.update = function(name, updatedUniversity,callback){
    return db.update({name:name},updatedUniversity,{},callback);
};

module.exports = new Universities();