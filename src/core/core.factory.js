/**
 * Created by sguilly on 06/01/16.
 */



(function () {

    'use strict';

    var core = angular.module('app.core');

    // Restangular service that uses Bing
    core.factory('MoscaRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('http://localhost:2003');
        });
    });
})();




