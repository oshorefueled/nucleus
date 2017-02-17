
"use strict";

var routeProperties = {
    controllers : [],
    props : [],
    modules:{}
};

function callActions(app,routes){
    routeProperties.controllers = getRouteProperty(routes,function (route) {
        if(route.namespace){
            var namespace = route.namespace+"/";
            var child_route = route.childRoutes;
            for(var i=0;i<child_route.length;i++){
                return namespace+child_route[i].controller;
            }
        } else {
            return route.controller;
        }
    } );

    routeProperties.props = getTempRouteProperty(routes);
    routeProperties.modules = requireTempController(routeProperties.controllers);

    for(var k=0;k<routeProperties.props.length;k++){
        var action = routeProperties.props[k].action;
        var controller = routeProperties.props[k].controller;
        var path = routeProperties.props[k].path;
        var reqType = routeProperties.props[k].reqType;

        var controller_action = routeProperties.modules[controller][action];
        callWithMethods(app,reqType,path,controller_action);
    }
}


function requireTempController(controllers){
    var tempObject = {};
    var tempArray = [];
    for(var i =0; i<controllers.length;i++){
        var controller_name = controllers[i];
        if(tempArray.indexOf(controller_name) == -1){
            tempObject[controller_name] = require('../../app/controllers/'+controller_name);
            tempArray.push(controller_name);
        }
    }
    return tempObject;
}

function getTempRouteProperty(routes) {
    var tempArray = [];
    for (var i = 0; i < routes.length; i++) {
        if (routes[i].childRoutes) {
            var namespace = routes[i].namespace ? routes[i].namespace+'/':'';
            var prefix = routes[i].prefix ? routes[i].prefix:'';
            var childRoutes = routes[i].childRoutes;

            for (var j = 0; j < childRoutes.length; j++) {
                var controller = namespace+childRoutes[j].controller;
                var path = prefix+childRoutes[j].path;
                tempArray.push(setRouteProperty(controller,childRoutes[j].action,path,
                    childRoutes[j].reqType));
            }
        } else {
                tempArray.push(setRouteProperty(routes[i].controller,routes[i].action,routes[i].path,
                    routes[i].reqType));
        }
    }
    return tempArray;
}

function setRouteProperty(controller_name,action,path,reqType,prefix,namespace){
    reqType = prefix==undefined ? 'get' : prefix;
    prefix = prefix==undefined ? null : prefix;
    namespace = prefix==undefined ? null : prefix;

    var routeProps = {
            controller: controller_name,
            controller_path:'../../app/controllers/'+controller_name,
            action:action,
            path:path, reqType:reqType,
            prefix:prefix,
            namespace:namespace
    };
    return routeProps;
}

function getRouteProperty(routes, callback){
    var tempArray = [];
    for(var i=0;i<routes.length;i++){
        tempArray.push(callback(routes[i]));
    }
    return tempArray;
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
            app.get(path, action);
            break;
    }
}

module.exports = {
    callActions:callActions
};