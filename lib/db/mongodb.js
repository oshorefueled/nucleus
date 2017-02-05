/*
 ===================================================
 --------------------------------------
    DATABASE CONNECTION
 --------------------------------------
  This Manages your connection to mongodb
 ====================================================
 */

var config = require('../../database/config');
var mongoose = require('mongoose');

function connect() {
    var host = config.host;
    var port = config.port;
    var username = config.username;
    var password = config.password;
    var dbname = config.dbname;

    username = username ? username+":" : username;
    password = password ? password+"@" : password;

    var connection_string = "mongodb://"+username+password+host+":"+port+"/"+dbname;
    if(host !== "" && host !== undefined){
        mongoose.connect(connection_string);

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log( "You are connected to "+connection_string);
        });
    }
}

module.exports = {
    connect:connect
};