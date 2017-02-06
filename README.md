# Nucleus
A Nodejs MVC framework


## Description
Nucleus is a nodejs framework aimed at making collaboration and writing large projects in node easier and cleaner.
The project was awesomely inspired by laravel project structure


## Dependencies
    *express
    *body-parser
    *mongoose
    *bluebird


### To Start, Run:
    *  npm install
    *  npm start 


## Features:

#### Routing
    *Description: Map routes to controllers in app/routes/web.js

    *Basic route:
     {path:"/", controller:"examplecontroller",action:"index", reqType:"get"}

    *Prefixes:
    -Grouping  routes with prefixes
    {prefix:'/v1', childRoutes:[
        {path:"/user", controller:"examplecontroller",action:"getUser", reqType:"get"},
        {path:"/login", controller:"examplecontroller",action:"index", reqType:"post"}
       ]}
    --visit route at example.com/v1/user

    *Namespaces
    -Organize controllers into directories and add them as namespaces
    {prefix:'/v1', namespace:"auth", childRoutes:[
        {path:"/auth", controller:"authcontroller",action:"index", reqType:"get"}
       ]}








