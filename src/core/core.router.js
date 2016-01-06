(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        //$locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('dashboard', {
                url: '/',
                template: '<tmpl-dashboard class="page"></tmpl-dashboard>'
            })

            .state('etl', {
                url: '/etl',
                template: '<tmpl-etl class="page"></tmpl-etl>'
            })

    .state('etl-model', {
            url: '/etl-model/:objectId',
            template: '<tmpl-etl-model class="page"></tmpl-etl-model>'
        })
            .state('topics', {
                url: '/topics',
                template: '<tmpl-topics class="page"></tmpl-topics>'
            });
    }
})();
