(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminGroupMenuAddController', AdminGroupMenuAddController);

  /* @ngInject */
  function AdminGroupMenuAddController(data, menus, logger, $uibModalInstance) {
    var vm = this;

    /**
     * Variable Initiation
     */
    vm.data = data;
    vm.menus = menus;
    vm.submit = false;

    /**
     * Function Declaration
     */
    vm.disable = disable;
    vm.simpan = simpan;

    ///////////////////////

    activate();

    ///////////////////////

    function activate() {

    }

    function disable(item) {
      var disableChoice = false;
      for (var i = 0; i < vm.data.length; i++) {
        if (item === vm.data[i].id_m_menu) {
          disableChoice = true;
          break;
        }
      }
      return disableChoice;
    }

    function simpan() {
      $uibModalInstance.close(vm.formAdd.menu);
      // $uibModalInstance.dismiss('cancel');
      // vm.reloadTable();
    }

  }
})();
