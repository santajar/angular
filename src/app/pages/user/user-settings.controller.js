(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('UserSettingsController', UserSettingsController);

  /* @ngInject */
  function UserSettingsController(SweetAlert, logger, $state, AuthService) {
    var vm = this;

    /**
     * Variable Initiation
     */
    vm.formPwd = {};
    vm.submitted = false;

    /**
     * Function Declaration
     */
    vm.changePassword = changePassword;
    vm.resetForm = resetForm;

    ///////////////////////

    activate();

    ///////////////////////

    function activate() {

    }

    function changePassword() {
      vm.submitted = true;
      if (AuthService.checkPassword(vm.formPwd.passwordLama)) {
        if (vm.formPwd.passwordBaru === vm.formPwd.ulangPasswordBaru) {
          AuthService.changePassword(vm.formPwd).then(function (response) {
            SweetAlert.swal("Sukses!", "Ubah Password Berhasil!", "success");
            reload();
          }, function () {
            SweetAlert.swal("Error!", "Ada masalah dengan Server!", "danger");
            vm.submitted = false;
          });
        } else {
          SweetAlert.swal("Salah!", "Password Baru Harus Sama", "warning");
          vm.submitted = false;
        }
      } else {
        SweetAlert.swal("Salah!", "Password Lama Salah", "warning");
        vm.submitted = false;
      }
    }

    function reload() {
      $state.go($state.current, {}, {
        reload: true
      });
    }

    function resetForm() {
      vm.formPwd = {};
      vm.formPassword.$setUntouched();
    }

  }
})();
