(function () {

    'use strict';

    angular.module('app.etl')
        .directive('tmplEtlModel', directiveFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/etl/model/etl-model.html',
            scope: {
            },
            controller: 'EtlModelController',
            controllerAs: 'vm'
        };

        return directive;
    }




})();
