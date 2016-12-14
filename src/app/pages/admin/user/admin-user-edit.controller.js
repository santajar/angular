(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminUserEditController', AdminUserEditController);

  /* @ngInject */
  function AdminUserEditController(roles, user, adminUserService, SweetAlert, $state, logger) {
    var vm = this;
    vm.goBack = goBack;
    vm.updateUser = updateUser;

    vm.changeRole = changeRole;

    vm.groups = [];
    vm.roles = roles;

    vm.formUpdateUser = user;

    activate();

    ////////////////

    function activate() {
      getGroupsByRole(vm.formUpdateUser.idMRole);
    }

    function changeRole(roleId) {
      vm.formUpdateUser.idMGroup = '';
      vm.groups = [];
      getGroupsByRole(roleId);
    }

    function getGroupsByRole(roleId) {
      adminUserService.groupsRole(roleId).then(function (response) {
        vm.groups = response;
      });
    }

    function goBack() {
      $state.go('^');
    }

    function updateUser() {
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
            return adminUserService.updateUser(vm.formUpdateUser).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Update!", "Username " + vm.formUpdateUser.username + " has been updated.", "success");
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
