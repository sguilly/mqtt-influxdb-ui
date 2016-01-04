(function () {

    'use strict';

    angular.module('app.dashboard')
        .directive('tmplDashboard', directiveFunction)
        .controller('DashboardController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            scope: {
            },
            controller: 'DashboardController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger','Restangular'];

    /* @ngInject */
    function ControllerFunction(logger,Restangular) {

        var vm = this;

        vm.toto = 'toto';

        vm.selected = [];
        vm.searchText = '';

        vm.query = {
            order: 'values.rss',
            limit: 5,
            page: 1
        };

        var Data = Restangular.all('data');

        vm.delete = function(line)
        {
            line.remove();
        };

        vm.promise = Data.getList({query: {toto: 'tt'}});

        vm.promise.then(function(values)
        {
           console.log('values=',values.length);

            console.log(JSON.stringify(values[0],null,3));

            vm.rawData = values;

        });

        vm.onPaginate = function(page, limit) {
            // $scope.$broadcast('md.table.deselect');

            console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.limit);
            console.log('Page: ' + page + ' Limit: ' + limit);

            //$scope.promise = $timeout(function () {
            //
            //}, 2000);
        };



        activate();

        function activate() {
            logger.log('Activated Dashboard View');
        }
    }

})();
