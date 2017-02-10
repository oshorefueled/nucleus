/**
 * Created by osho on 1/30/17.
 */

var controllers = [];
var actions = [];
var paths  = [];
var request_types = [];
var controller_modules = {}; // Object that contains the required controllers



function callActions(app,routes){

    getRouteProperties(routes);
    requireControllers();
    var actions_length = actions.length;

    for(var i=0; i<actions_length;i++){
        var controller_action = controller_modules[controllers[i]][actions[i]];
        var request_type = request_types[i];
        var path = paths[i];
        callWithMethods(app,request_type,path,controller_action);
    }
}

function getRouteProperty(routes, callback){
    var tempArray = [];
    for(var i=0;i<routes.length;i++){
        tempArray.push(callback(routes[i]));
    }
    return tempArray;
}

/**
    save route properties into their respective
    arrays
**/
function getRouteProperties(routes) {

    controllers = getRouteProperty(routes, function (route) {
        if(route.namespace){
            var namespace = route.namespace+"/";
            var child_route = route.childRoutes;
            for(var i=0;i<child_route.length;i++){
                return namespace+child_route[i].controller;
            }
        } else {
            return route.controller;
        }
    });

    paths = getRouteProperty(routes, function(route){
        if(route.prefix){
            var prefix = route.prefix;
            var child_route = route.childRoutes;
            for(var i=0;i<child_route.length;i++){
                return prefix+child_route[i].path;
            }
        } else {
            return route.path;
        }
    });

    request_types = getRouteProperty(routes, function (route) {
        if(route.childRoutes){
            var child_route = route.childRoutes;
            for(var i=0;i<child_route.length;i++){
                return child_route[i].reqType;
            }
        } else {
            return route.reqType
        }
    });

    actions = getRouteProperty(routes, function (route) {
        if(route.childRoutes){
            var child_route = route.childRoutes;
            for(var i=0;i<child_route.length;i++){
                return child_route[i].action;
            }
        } else {
            return route.action;
        }
    });
}


function requireControllers() {
    var controllers_length = controllers.length;

    for(var i =0; i<controllers_length;i++){
        var controller_name = controllers[i];
        controller_modules[controller_name] = require('../../app/controllers/'+controller_name);
    }
}

function callWithMethods(app,request_type,path,action) {
    switch(request_type){
        case "get":
            app.get(path, action);
            break;
        case "post":
            app.post(path, action);
            break;
        case "delete":
            app.delete(path,action);
            break;
        case "put":
            app.put(path, action);
            break;
        default:
            console.log("no request type was passed");
            break;
    }
}

module.exports = {
    callActions:callActions
};