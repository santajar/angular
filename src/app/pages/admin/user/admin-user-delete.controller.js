(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminUserDeleteController', AdminUserDeleteController);

  /* @ngInject */
  function AdminUserDeleteController(user, adminUserService, SweetAlert, $state) {
    var vm = this;
    vm.deleteUser = deleteUser;
    vm.formDeleteUser = user;
    vm.goBack = goBack;

    activate();

    ////////////////

    function activate() {

    }

    function deleteUser() {
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
            return adminUserService.deleteUser(vm.formDeleteUser.id).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Deleted!", "Username " + vm.formDeleteUser.username + " has been deleted.", "success");
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
