(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterBanksEditController', MasterBanksEditController);

  /* @ngInject */
  function MasterBanksEditController(bank, BanksService, logger, $uibModalInstance) {
    var vm = this;

    /**
    * Variable Initiation
    */
    vm.bank = bank;
    vm.bankDefault = angular.copy(bank);
    vm.btn = {
      submit: {
        text: "Edit",
        state: false,
        style: "btn-primary"
      },
      clear: {
        text: "Clear",
        state: false,
        style: "btn-warning"
      }
    };
    vm.frmState = {
      bankId: true,
      nama: false,
      bankCode: false
    };
    vm.title = 'Edit Data Bank';

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
      vm.bank = angular.copy(vm.bankDefault);
      vm.frmBankCtrl.$setPristine();
    }

    function submit() {
      btnToggle();
      var result = {};
      BanksService.updateBank(vm.bank).then(function (response) {
        result.status = true;
        result.msg = "Data berhasil diupdate!";
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
