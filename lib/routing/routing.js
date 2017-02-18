"use strict";

var routeProperties = {
    controllers: [],
    props: [],
    modules: {}
};

/**
 calls the controller with it's appropriate method
 and request type
 */
function callActions(app, routes) {
    routeProperties.controllers = getRouteControllers(routes, function (route) {
        if (route.namespace && route.childRoutes) {
            var namespace = route.namespace + "/";
            var child_route = route.childRoutes;
            for (var i = 0; i < child_route.length; i++) {
                return namespace + child_route[i].controller;
            }
        } else if(route.namespace){
            var namespace = route.namespace + "/";
            return namespace + route.controller;
        } else {
            return route.controller;
        }
    });
    routeProperties.props = getRouteProperty(routes);
    routeProperties.modules = requireController(routeProperties.controllers);

    for (var k = 0; k < routeProperties.props.length; k++) {
        var action = routeProperties.props[k].action;
        var controller = routeProperties.props[k].controller;
        var path = routeProperties.props[k].path;
        var reqType = routeProperties.props[k].reqType;
        var controller_action = routeProperties.modules[controller][action];
        
        callWithMethods(app, reqType, path, controller_action);
    }
}

function requireController(controllers) {
    var tempObject = {};
    var tempArray = [];
    for (var i = 0; i < controllers.length; i++) {
        var controller_name = controllers[i];
        if (tempArray.indexOf(controller_name) == -1) {
            tempObject[controller_name] = require('../../app/controllers/' + controller_name);
            tempArray.push(controller_name);
        }
    }
    return tempObject;
}

/**
 * @param routes
 * @returns {Array}
 *
 * get's all properties from route and saves it
 * in routeproperties.props
 */
function getRouteProperty(routes) {
    var tempArray = [];

    for (var i = 0; i < routes.length; i++) {
        if (routes[i].childRoutes) {
            var namespace = routes[i].namespace ? routes[i].namespace + '/' : '';
            var prefix = routes[i].prefix ? routes[i].prefix : '';
            var childRoutes = routes[i].childRoutes;

            for (var j = 0; j < childRoutes.length; j++) {
                var controller = namespace + childRoutes[j].controller;
                var path = prefix + childRoutes[j].path;
                tempArray.push(setRouteProperty(controller, childRoutes[j].action, path,
                    childRoutes[j].reqType));
            }
        } else {
            var namespace = routes[i].namespace ? routes[i].namespace + '/' : '';
            var controller = namespace + routes[i].controller;
            tempArray.push(setRouteProperty(controller, routes[i].action, routes[i].path,
                routes[i].reqType));
        }
    }
    return tempArray;
}

/**
 * Structures route properties to be stored
 * in routeproperties.props
 */
function setRouteProperty(controller_name, action, path, reqType, prefix, namespace) {
    reqType = prefix == undefined ? 'get' : prefix;
    prefix = prefix == undefined ? null : prefix;
    namespace = prefix == undefined ? null : prefix;

    var routeProps = {
        controller: controller_name,
        controller_path: '../../app/controllers/' + controller_name,
        action: action,
        path: path, reqType: reqType,
        prefix: prefix,
        namespace: namespace
    };
    return routeProps;
}

function getRouteControllers(routes, callback) {
    var tempArray = [];
    for (var i = 0; i < routes.length; i++) {
        tempArray.push(callback(routes[i]));
    }
    return tempArray;
}

function callWithMethods(app, request_type, path, action) {
    switch (request_type) {
        case "get":
            app.get(path, action);
            break;
        case "post":
            app.post(path, action);
            break;
        case "delete":
            app.delete(path, action);
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
    callActions: callActions
};