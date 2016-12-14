(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterCollectingAgentsEditController', MasterCollectingAgentsEditController);

  /* @ngInject */
  function MasterCollectingAgentsEditController(banks, ca, $uibModalInstance, logger, CollectingAgentsService) {
    var vm = this;

    /**
    * Variable Initiation
    */
    vm.banks = banks;
    vm.btn = {
      submit: {
        text: 'Edit',
        state: false,
        style: 'btn-primary'
      },
      clear: {
        text: 'clear',
        state: false,
        style: 'btn-warning'
      }
    };
    vm.ca = ca;
    vm.caDefault = angular.copy(ca);
    vm.frmState = {};
    vm.title = 'Edit Data CA';

    /**
    * Function Declaration
    */
    vm.clear = clear;
    vm.submit = submit;

    ////////////////

    activate();

    ////////////////

    function activate() {

    }

    function btnToggle() {
      vm.btn.submit.state != vm.btn.submit.state;
    }

    function clear() {
      vm.ca = angular.copy(vm.caDefault);
      vm.frmCACtrl.$setPristine();
    }

    function submit() {
      btnToggle;
      var result = {};
      CollectingAgentsService.updateCA(vm.ca).then(function (response) {
        result.status = true;
        result.msg = "Data berhasil diubah!";
        btnToggle();
        $uibModalInstance.close(result);
      }, function (response) {
        result.status = false;
        result.msg = response.data.error.detail;
        btnToggle();
        $uibModalInstance.close(result);
      });
    }

  }
})();
