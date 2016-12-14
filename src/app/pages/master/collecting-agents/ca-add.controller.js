(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterCollectingAgentsAddController', MasterCollectingAgentsAddController);

  /* @ngInject */
  function MasterCollectingAgentsAddController(banks, $uibModalInstance, logger, CollectingAgentsService) {
    var vm = this;

    /**
    * Variable Initiation
    */
    vm.banks = banks;
    vm.btn = {
      submit: {
        text: 'Tambah',
        state: false,
        style: 'btn-primary'
      },
      clear: {
        text: 'clear',
        state: false,
        style: 'btn-warning'
      }
    };
    vm.ca = {};
    vm.frmState = {};
    vm.title = 'Tambah Data CA';

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
      vm.ca = {};
      vm.frmCACtrl.$setPristine();
    }

    function submit() {
      btnToggle;
      var result = {};
      CollectingAgentsService.saveCA(vm.ca).then(function (response) {
        result.status = true;
        result.msg = "Data berhasil ditambah!";
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
