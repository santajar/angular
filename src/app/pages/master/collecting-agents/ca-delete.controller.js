(function() {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('MasterCollectingAgentsDeleteController', MasterCollectingAgentsDeleteController);

  /* @ngInject */
  function MasterCollectingAgentsDeleteController(banks, ca, logger, $uibModalInstance, CollectingAgentsService) {
    var vm = this;

    /**
    * Variable Initiation
    */
    vm.banks = banks;
    vm.ca = ca;
    vm.caDefault = angular.copy(ca);
    vm.btn = {
      submit: {
        text: 'Hapus',
        state: false,
        style: 'btn-danger'
      },
      clear: {
        text: 'Tutup',
        state: false,
        style: 'btn-warning'
      }
    };
    vm.delete = true;
    vm.frmState = {
      caCode: true,
      caName: true,
      headerResi: true,
      bankId: true,
      ppn: true,
      pph: true,
      limitFeeTrf: true,
      masterCa: true,
      feeType: true
    };
    vm.title = 'Hapus Data CA';

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
      CollectingAgentsService.deleteCA(vm.ca.caCode).then(function (response) {
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
