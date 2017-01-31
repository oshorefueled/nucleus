/**
 * Created by osho on 1/30/17.
 */

var controllers = [];
var actions = [];
var paths  = [];
var request_types = [];
var controller_modules = {};

function callActions(app,routes){
    getActions(routes);
    getPaths(routes);
    getRequestTypes(routes);
    requireControllers(routes);

    var actions_length = actions.length;
    
    for(var i=0; i<actions_length;i++){
        var controller_action = controller_modules[controllers[i]][actions[i]];
        var request_type = request_types[i];
        var path = "/"+paths[i];

        callWithMethods(app,request_type,path,controller_action);
    }
}


function requireControllers(routes) {
    getControllers(routes);
    var controllers_length = controllers.length;

    for(var i =0; i<controllers_length;i++){
        var controller_name = controllers[i];
        controller_modules[controller_name] = require('../../app/controllers/'+controller_name);
    }
}

function callWithMethods(app,request_type,path,action) {
    if(request_type == "get"){
        app.get(path, action);
    }
    if(request_type == "post "){
        app.post(path, action);
    }
    if(request_type == "delete"){
        app.delete(path,action);
    }
    if(request_type =="put"){
        app.put(path,action);
    }
}

function getPaths(routes){
    var array_length = routes.length;
    for(var i=0; i<array_length;i++){
        paths.push( routes[i].path);
    }
}

function getControllers(routes){
    var array_length = routes.length;
    for(var i=0; i<array_length;i++){
        controllers.push( routes[i].controller);
    }
}

function getActions(routes) {
    var array_length = routes.length;
    for(var i=0; i<array_length;i++){
        actions.push( routes[i].action);
    }
}

function getRequestTypes(routes) {
    var array_length = routes.length;
    for(var i=0; i<array_length;i++){
        request_types.push(routes[i].reqType);
    }
}


module.exports = {
    callActions:callActions
};