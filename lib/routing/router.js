var routes = require('../../routes/web');
var routing = require('./routing');

var controllers = routing.getControllers(routes);
var methods = routing.getMethods(routes);
var actions = routing.getActions(routes);
var requireControllers = routing.requireControllers;
var callActions = routing.callActions;


var controller_modules = {};
requireControllers(controller_modules, controllers);
callActions(controller_modules, controllers, actions);




