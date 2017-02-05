
var user = require('../../database/Schemas/user.schema');

function saveUsers(username, email, password) {
    var user_data = [{
        "username":username,
        "email":email,
        "password":password
    }];

    user.create(user_data, function (err, result) {
        if(err){
            console.log(err);
            return err;
        }
    });
    var response = {"status":"success", "data":user_data};
    return response
}

function getUser(username) {
    user.find({username:username}, function (err,result) {
        if(err){
            console.log(err);
        }
    }).then(function (response) {
        return response;
    })
}


var userModel = {
    saveUsers:saveUsers,
    getUsers : getUser
};

module.exports = userModel;