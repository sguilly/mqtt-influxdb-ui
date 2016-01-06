/* jshint ignore:start */

var path = require('path');
var express = require('express');

module.exports = function (mqttInfluxdb) {

    'use strict';

    console.log('load ui')

    var app = express();

    var bodyParser = require('body-parser');

    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    var Data = require('./lib/models/data')(mqttInfluxdb.dataDb);
    var Etl = require('./lib/models/etl')(mqttInfluxdb);


    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
        next();
    });

    require('express-crud')(app);

    app.crud('data', Data);
    app.crud('etl', Etl);



    app.use('/', express.static(path.join(__dirname, 'build'))); // jshint ignore:line

    //app.delete('/data/deleteAll', function (req, res) {
    //
    //    console.log('delete All Data');
    //    res.send('');
    //});

    return app;

};

/* jshint ignore:end */
