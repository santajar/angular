(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('AdminGroupEditController', AdminGroupEditController);

  /* @ngInject */
  function AdminGroupEditController(roles, group, adminGroupService, SweetAlert, $state, $stateParams) {
    var vm = this;
    vm.roles = roles;
    vm.formUpdateGroup = group;
    vm.goBack = goBack;
    vm.updateGroup = updateGroup;

    activate();

    ////////////////

    function activate() {

    }

    function goBack() {
      $state.go('^');
    }

    function updateGroup() {
      SweetAlert.swal({
          title: "Are you sure?",
          text: "Update this Group data !?",
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
            return adminGroupService.updateGroup(vm.formUpdateGroup).then(
              function (response) {
                if (response.rc === '00') {
                  SweetAlert.swal("Update!", "Group Name " + vm.formUpdateGroup.groupName + " has been updated.", "success");
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
