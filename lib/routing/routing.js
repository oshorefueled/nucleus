/**
 * Created by osho on 1/30/17.
 */

var controllers = [];
var actions = [];
var paths  = [];
var request_types = [];
var controller_modules = {};


function callActions(app,routes){
    getRouteObjects(routes);

    requireControllers();
    var actions_length = actions.length;

    for(var i=0; i<actions_length;i++){
        var controller_action = controller_modules[controllers[i]][actions[i]];
        var request_type = request_types[i];
        var path = paths[i];
        callWithMethods(app,request_type,path,controller_action);

    }
}




function requireControllers() {
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
    if(request_type == "post"){
        app.post(path, action);
    }
    if(request_type == "delete"){
        app.delete(path,action);
    }
    if(request_type =="put"){
        app.put(path,action);
    }
}

function getPaths(parent_route){
    var prefix = "";
    if(parent_route.prefix){
        prefix = parent_route.prefix;
    }
    var array_length = parent_route['childRoutes'].length;
    for(var i=0; i<array_length;i++){
        paths.push(prefix+parent_route['childRoutes'][i].path);
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

function getRouteObjects(routes) {
    for(var i=0;i<routes.length;i++){
        if(routes[i].childRoutes !== undefined){
            var parent_route = routes[i];
            var child_routes = routes[i].childRoutes;

            getControllers(child_routes);
            getActions(child_routes);
            getPaths(parent_route);
            getRequestTypes(child_routes);
        } else {
            getSingleRouteObjects(routes[i]);
        }
    }
}


function getSingleController(route) {
   var controller = route.controller;
    controllers.push(controller);
}

function getSingleAction(route) {
    var action = route.action;
    actions.push(action);
}

function getSingleReqType(route) {
    var request_type = route.reqType;
    request_types.push(request_type);
}

function getSinglePath(route) {
    var path = route.path;
    paths.push(path);
}

function getSingleRouteObjects(route){
    getSingleController(route);
    getSingleAction(route);
    getSinglePath(route);
    getSingleReqType(route);
}


module.exports = {
   callActions:callActions
};