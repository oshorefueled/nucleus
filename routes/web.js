/*
 ===================================================
    --------------------------------------
    Application Routes
    --------------------------------------

    This is where you register your routes and map
    them to your controllers
 ====================================================
*/




var routes = [{
  path:"test", controller:"testcontroller",action:"index", req:"get"},
  {path:"update", controller:"updatecontroller", action:"update", req:"post"}
];


module.exports = routes;