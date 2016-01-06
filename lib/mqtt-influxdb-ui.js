/* jshint ignore:start */

var path = require('path');
var express = require('express');

module.exports = function (mqttInfluxdb) {

    'use strict';

    console.log('load ui ');

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


    mqttInfluxdb.clientRedis = require('redis').createClient();
    var Topics = require('./models/topics')(mqttInfluxdb);
    app.crud('topics', Topics);

    //app.use('/', function (req, res) {
    //
    //        console.log('/');
    //        res.send('hello');
    //    });

    var staticPath = path.join(__dirname, '../build');

    console.log('staticPath=',staticPath);

    app.use('/', express.static(staticPath)); // jshint ignore:line

    //app.delete('/data/deleteAll', function (req, res) {
    //
    //    console.log('delete All Data');
    //    res.send('');
    //});

    return app;

};

/* jshint ignore:end */
