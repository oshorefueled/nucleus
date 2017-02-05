var user = require('../models/user.model');

function index (req, res) {
   res.send("Welcome to NUCLEUS.. Muahahahaha");
}

function prefix(req,res) {
    res.send("Url Prefixes work!");
}

function saveUsers(req, res) {
    var username = req.query.username;
    var email = req.query.email;
    var password = req.query.password;

    var response = user.saveUsers(username, email, password);
    res.send(response);
}

function getUser(req, res) {
    var response = user.getUsers(req.params.uname);
    res.send(response);
}


module.exports = {
    prefix:prefix,
    index:index,
    saveUsers:saveUsers,
    getUser:getUser
};