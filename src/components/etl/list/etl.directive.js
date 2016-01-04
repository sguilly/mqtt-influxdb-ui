(function () {

    'use strict';

    angular.module('app.etl')
        .directive('tmplEtl', directiveFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/etl/list/etl.html',
            scope: {
            },
            controller: 'AccountsController',
            controllerAs: 'vm'
        };

        return directive;
    }




})();
