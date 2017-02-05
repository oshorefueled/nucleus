var routes = require('../app/routes/web');
var routing = require('../lib/routing/routing');
var mongodb = require('../lib/db/mongodb');




function start(app){
    console.log('\n Nucleus is live....');
    
    routing.callActions(app,routes);
    mongodb.connect();
}



module.exports = {
    start : start
};

