

(function () {

    'use strict';

    var core = angular.module('app.core');

    core.run(runFunction);


    runFunction.$inject = ['Restangular'];

    /* @ngInject */
    function runFunction(Restangular) {
        console.log('set Restangular');
        Restangular.setBaseUrl('http://localhost:5080/mqtt-influxdb-ui');
        //Restangular.setFullResponse(true);


    }


})();
