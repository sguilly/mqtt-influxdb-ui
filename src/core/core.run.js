

(function () {

    'use strict';

    var core = angular.module('app.core');

    core.run(function(Restangular) {

        console.log('set Restangular');
        Restangular.setBaseUrl('/mqtt-influxdb-ui');
        //Restangular.setFullResponse(true);

    });
})();
