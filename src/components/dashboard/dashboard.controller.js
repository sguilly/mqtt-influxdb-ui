(function () {

    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger','Restangular'];

    /* @ngInject */
    function ControllerFunction(logger,Restangular) {

        var vm = this;

        vm.selected = [];
        vm.searchText = '';

        vm.mdOptions = [10, 50, 100];

        vm.query = {
            order: 'values.rss',
            limit: 10,
            page: 1
        };

        var Data = Restangular.all('data');

        vm.removeAll = function()
        {
            Data.customDELETE('deleteAll',{}).then(function()
            {
                vm.loadData();
            });
        };

        vm.removeSelected = function()
        {
            console.log('Selected=',vm.selected);

            var promises = [];

            for (var index = 0; index < vm.selected.length; index++) {
                promises.push(vm.selected[index].remove());

            }

            Promise.all(promises).then(function()
            {
                vm.loadData();
            });
        };

        vm.remove = function(line)
        {
            line.remove();
        };

        vm.loadData = function()
        {
            vm.promise = Data.getList();

            vm.promise.then(function(values)
            {
                //console.log('values=',values.length);

                //console.log(JSON.stringify(values[0],null,3));

                vm.rawData = values;

            });
        };

        vm.onPaginate = function(page, limit) {
            // $scope.$broadcast('md.table.deselect');

            console.log('Scope Page: ' + vm.query.page + ' Scope Limit: ' + vm.query.limit);
            console.log('Page: ' + page + ' Limit: ' + limit);

            //$scope.promise = $timeout(function () {
            //
            //}, 2000);
        };


        vm.loadData();

    }

})();

