var user = require('../models/user.model');

/*
    This is the index action!
 */
function index (req, res) {
   res.send("Welcome to NUCLEUS.. Muahahahaha");
}


/*
 * Controller Action to test prefix in routes
 *
 */
function prefix(req,res) {
    res.send("Url Prefixes work!");
}


/*
 *  This is an example API that uses the user Model
 *  Find models in directory app/models
 */

function createUsers(req, res) {
    var username = req.query.username;
    var email = req.query.email;

    var response = user.createUsers(username, email);
    response.then(function (result) {
        res.json({"status":"success","data":result});
    });
}



module.exports = {
    prefix:prefix,
    index:index,
    createUsers:createUsers
};