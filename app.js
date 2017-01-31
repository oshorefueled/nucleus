var express = require('express');
var router = require('./lib/routing/router');
var app = express();

//create port
var port = process.env.PORT || 3000;

app.listen(port);

//start nucleus
router.start(app);



app.get('/tester', function (req, res) {
    res.send('tester is working');
});


