var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = new Schema({
    "username":String,
    "email":String,
});



var users = mongoose.model('users', userSchema);
module.exports = users;