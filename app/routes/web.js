/*
 ===================================================
    --------------------------------------
    Application Routes
    --------------------------------------

    This is where you register your routes and map
    them to your controllers
 ====================================================
*/




var routes = [
  {path:"/", controller:"examplecontroller",action:"index", reqType:"get"},
  {path:"/users", controller:"examplecontroller",action:"createUsers", reqType:"post"},

  {prefix:'/v1', namespace:"auth", childRoutes:[
    {path:"/auth", controller:"authcontroller",action:"index", reqType:"get"}
   ]}

];


module.exports = routes;