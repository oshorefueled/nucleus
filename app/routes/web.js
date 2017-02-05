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
  {path:"/users", controller:"examplecontroller",action:"saveUsers", reqType:"post"},
  {path:"/users/:uname", controller:"examplecontroller",action:"getUser", reqType:"get"},

  {prefix:'/v1', childRoutes:[
    {path:"/prefix", controller:"examplecontroller",action:"prefix", reqType:"get"}
   ]}

];


module.exports = routes;