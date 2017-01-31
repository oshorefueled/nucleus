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
  path:"test", controller:"testcontroller",action:"index", reqType:"get"},
  {path:"poster", controller:"updatecontroller", action:"update", reqType:"post"},
  {path:"/", controller:"indexcontroller", action:"index", reqType:"get"}
];


module.exports = routes;