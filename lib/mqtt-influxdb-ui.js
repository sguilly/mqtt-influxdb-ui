/* jshint ignore:start */

var path = require('path');
var express = require('express');

module.exports = function (mqttInfluxdb,clientRedis) {

    'use strict';

    var app = express();

    var bodyParser = require('body-parser');

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        next();
    });

    require('express-crud')(app);

    var Data = require('./models/data')(mqttInfluxdb);
    app.crud('data', Data);

    var Etl = require('./models/etl')(mqttInfluxdb);
    app.crud('etl', Etl);

    if(clientRedis)
    {
        var Topics = require('./models/topics')(clientRedis);
        app.crud('topics', Topics);
    }

    var staticPath = path.join(__dirname, '../build');

    //console.log('staticPath=',staticPath);

    app.use('/', express.static(staticPath)); // jshint ignore:line



    return app;

};

/* jshint ignore:end */
