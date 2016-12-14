(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminRoleDeleteController', AdminRoleDeleteController);

  /* @ngInject */
  function AdminRoleDeleteController(role, adminRoleService, SweetAlert, $state, $stateParams) {
    var vm = this;
    vm.deleteRole = deleteRole;
    vm.formDeleteRole = role;
    vm.goBack = goBack;

    activate();

    ////////////////

    function activate() {

    }

    function deleteRole() {
      SweetAlert.swal({
          title: "Are you sure?",
          text: "You will not be able to recover this user data!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel it!",
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        },
        function (isConfirm) {
          if (isConfirm) {
            return adminRoleService.deleteRole(vm.formDeleteRole.id).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Deleted!", "Role " + vm.formDeleteRole.roleName + " has been deleted.", "success");
                  goBack();
                } else {
                  SweetAlert.swal("Failed", "Query Error", "error");
                  goBack();
                }
              },
              function (response) {
                if (response.status !== '200') {
                  SweetAlert.swal("Failed", "Connection to Server Error", "error");
                  goBack();
                }
              }
            );
          }
        }
      );
    }

    function goBack() {
      $state.go('^');
    }

  }
})();
