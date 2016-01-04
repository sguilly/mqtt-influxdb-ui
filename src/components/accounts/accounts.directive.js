(function () {

    'use strict';

    angular.module('app.accounts')
        .directive('tmplAccounts', directiveFunction)
        .controller('AccountsController', ControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/accounts/accounts.html',
            scope: {
            },
            controller: 'AccountsController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger','Restangular'];

    /* @ngInject */
    function ControllerFunction(logger,Restangular) {

        var vm = this;

        activate();

        var Decoder = Restangular.all('decoder');

        vm.addDecoder = function()
        {
         console.log('add');

            var newDecoder = {
                topic: 'toto/tata',
                params: {
                    qos: 0,
                    seriesName: 'process',
                    timeKeys: ['time', 'date'],
                    denyKeys: [],//['power'],
                    tagKeys: ['hostname', 'pid', 'name'],
                    transform: {tem: 'temperature', hum: 'humidity'},
                    allowString: false
                }
            };

            Decoder.post(newDecoder);
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
