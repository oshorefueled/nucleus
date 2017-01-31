var routes = require('../../routes/web');
var routing = require('./routing');
var express = require('express');



function start(app){
    routing.callActions(app,routes);
}

module.exports = {
  start : start
};



// requireControllers(controller_modules, controllers);
// callActions(controller_modules, controllers, actions);




