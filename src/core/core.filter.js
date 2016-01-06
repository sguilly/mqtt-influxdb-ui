/**
 * Created by sguilly on 06/01/16.
 */

(function () {

    'use strict';

    var core = angular.module('app.core');

    core.filter('stringToDate',function() {

        return function(stringDate) {

            var date = new Date(Number(stringDate));

            return new Date(date);
        };

    });
})();
