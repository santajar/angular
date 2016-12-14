(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterBanksDeleteController', MasterBanksDeleteController);

  /* @ngInject */
  function MasterBanksDeleteController(bank, logger, $uibModalInstance, BanksService) {
    var vm = this;

    /**
    * Variable Initiation
    */
    vm.bank = bank;
    vm.bankDefault = angular.copy(bank);
    vm.btn = {
      submit: {
        text: "Hapus",
        state: false,
        style: "btn-danger"
      },
      clear: {
        text: "Tutup",
        state: false,
        style: "btn-warning"
      }
    };
    vm.delete = true;
    vm.frmState = {
      bankId: true,
      nama: true,
      bankCode: true
    };
    vm.title = "Hapus Data Bank";

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
      $uibModalInstance.dismiss();
    }

    function submit() {
      btnToggle();
      var result = {};
      BanksService.deleteBank(vm.bank.bankId).then(function (response) {
        result.msg = "Data berhasil dihapus!";
        result.status = (parseInt(response.count, 10) > parseInt(0, 10)) ? true : false;
        btnToggle();
        $uibModalInstance.close(result);
      }, function (response) {
        result.msg = response.data.error.detail;
        result.status = false;
        btnToggle();
        $uibModalInstance.close(result);
      });
    }

  }
})();
