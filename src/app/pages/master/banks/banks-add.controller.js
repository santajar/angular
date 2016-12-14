(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterBanksAddController', MasterBanksAddController);

  /* @ngInject */
  function MasterBanksAddController($uibModalInstance, logger, BanksService) {
    var vm = this;

    /**
    * Variable Initiation
    */
    vm.bank = {}
    vm.btn = {
      submit: {
        text: "Tambah",
        state: false,
        style: "btn-primary"
      },
      clear: {
        text: "clear",
        state: false,
        style: "btn-warning"
      }
    };
    vm.frmState = {
      bankId: false,
      nama: false,
      bankCode: false
    };
    vm.title = 'Tambah Data Bank';

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
      vm.bank = {};
      vm.frmBankCtrl.$setPristine();
    }

    function submit() {
      btnToggle;
      var result = {};
      BanksService.saveBank(vm.bank).then(function (response) {
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
