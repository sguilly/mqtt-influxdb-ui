/**
 * Created by sguilly on 04/01/16.
 */

(function () {

    'use strict';

    angular.module('app.etl')
        .controller('EtlModelController', ControllerFunction);

    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger','Restangular','$stateParams','$state'];

    /* @ngInject */
    function ControllerFunction(logger,Restangular,$stateParams,$state) {

        var vm = this;



        if ($stateParams.objectId) {
            console.log($stateParams.objectId);

            Restangular.one('etl',$stateParams.objectId).get().then(function(etl) {
                console.log(etl);

                vm.etl = etl;

                console.log('vm.etl.timeKeys=',typeof vm.etl.params.timeKeys);

            });


        }

        vm.remove = function()
        {
          vm.etl.remove().then(function()
          {
              $state.go('etl');
          });
        };

        vm.save = function()
        {
          console.log('save');

            if(vm.etl._id)
            {
                if(typeof vm.etl.params.timeKeys === 'string')
                {
                    vm.etl.params.timeKeys = vm.etl.params.timeKeys.split(',');
                }

                if(typeof vm.etl.params.tagKeys === 'string')
                {
                    vm.etl.params.tagKeys = vm.etl.params.tagKeys.split(',');
                }

                if(typeof vm.etl.params.denyKeys === 'string')
                {
                    vm.etl.params.tagKeys = vm.etl.params.denyKeys.split(',');
                }

                vm.etl.put();
            }
            else {
                console.log('nouveau etl');

                Restangular.all('etl').post(vm.etl).then(function(etl)
                {
                    vm.etl = etl;
                });

            }


        };

        activate();






        function activate() {
            logger.log('Activated Accounts View');
        }
    }

})();
