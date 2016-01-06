/**
 * Created by sguilly on 04/01/16.
 */

(function () {

    'use strict';

    angular.module('app.etl')
        .controller('EtlController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger','Restangular','$state'];

    /* @ngInject */
    function ControllerFunction(logger,Restangular,$state) {

        var vm = this;

        activate();

        vm.selected = [];
        vm.searchText = '';

        vm.query = {
            order: 'values.rss',
            limit: 5,
            page: 1
        };

        var Decoder = Restangular.all('etl');

        vm.addDecoder = function()
        {
            console.log('add');

           $state.go('etl-model');
        };

        vm.update = function(line)
        {
            console.log('update:',line);
            line.topic = 'abc/abc';

            line.put();

        };



        Decoder.getList({query: {toto: 'tt'}}).then(function(values)
        {
            console.log('values=',values.length);

            console.log(JSON.stringify(values[0],null,3));

            vm.rawData = values;

        });

        function activate() {
            logger.log('Activated Accounts View');
        }
    }

})();
