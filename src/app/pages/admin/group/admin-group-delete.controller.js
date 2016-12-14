(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminGroupDeleteController', AdminGroupDeleteController);

  /* @ngInject */
  function AdminGroupDeleteController(group, adminGroupService, SweetAlert, $state, $stateParams) {
    var vm = this;
    vm.formDeleteGroup = group;
    vm.goBack = goBack;
    vm.deleteGroup = deleteGroup;

    activate();

    ////////////////

    function activate() {

    }

    function goBack() {
      $state.go('^');
    }

    function deleteGroup() {
      SweetAlert.swal({
          title: "Are you sure?",
          text: "Delete this Group !?",
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
            return adminGroupService.deleteGroup(vm.formDeleteGroup.id).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Deleted!", "Group " + vm.formDeleteGroup.groupName + " has been updated.", "success");
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
