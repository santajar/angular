(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminRoleEditController', AdminRoleEditController);

  /* @ngInject */
  function AdminRoleEditController(role, adminRoleService, SweetAlert, $state, $stateParams) {
    var vm = this;
    vm.formUpdateRole = role;
    vm.goBack = goBack;
    vm.updateRole = updateRole;

    activate();

    ////////////////

    function activate() {

    }

    function goBack() {
      $state.go('^');
    }

    function updateRole() {
      SweetAlert.swal({
          title: "Are you sure?",
          text: "Update this user data !?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, update it!",
          cancelButtonText: "No, cancel it!",
          closeOnConfirm: false,
          showLoaderOnConfirm: true
        },
        function (isConfirm) {
          if (isConfirm) {
            return adminRoleService.updateRole(vm.formUpdateRole).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Update!", "Role Name " + vm.formUpdateRole.roleName + " has been updated.", "success");
                  goBack();
                } else {
                  SweetAlert.swal("Failed", "Query Error", "error");
                }
              },
              function (response) {
                if (response.status !== '200') {
                  SweetAlert.swal("Failed", "Connection to Server Error", "error");
                }
              }
            );
          }
        }
      );
    }

  }
})();
