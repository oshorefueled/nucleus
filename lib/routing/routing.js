/**
 * Created by osho on 1/30/17.
 */

function callActions(controller_modules,controllers, actions){
    var actions_length = actions.length;

    for(var i=0; i<actions_length;i++){
        var methods = controller_modules[controllers[i]][actions[i]];
        methods();
    }



}

function requireControllers(controller_modules, controllers) {
    var controllers_length = controllers.length;

    for(var i =0; i<controllers_length;i++){
        var controller_name = controllers[i];
        controller_modules[controller_name] = require('../../controllers/'+controller_name);
    }
}

function getControllers(routes){
    var controllers = [];
    var array_length = routes.length;
    for(var i=0; i<array_length;i++){
        controllers.push( routes[i].controller);
    }
    return controllers;
}

function getActions(routes) {
    var actions = [];
    var array_length = routes.length;
    for(var i=0; i<array_length;i++){
        actions.push( routes[i].action);
    }
    return actions;
}

function getMethods(routes) {
    var methods = [];
    var array_length = routes.length;
    for(var i=0; i<array_length;i++){
        methods.push( routes[i].method);
    }
    return methods;
}


module.exports = {
    requireControllers:requireControllers,
    getControllers:getControllers,
    getActions:getActions,
    getMethods:getMethods,
    callActions:callActions
};