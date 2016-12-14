(function() {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .controller('AdminUserAddController', AdminUserAddController);

    /* @ngInject */
    function AdminUserAddController(adminUserService, roles, SweetAlert, $scope, $state, logger) {
        var vm = this;
        vm.addUser = addUser;
        vm.changeRole = changeRole;
        vm.resetForm = resetForm;
        vm.default = {};
        vm.goBack = goBack;
        vm.groups = [];
        vm.roles = roles;
        vm.submitted = false;

        activate();

        ////////////////

        function activate() {

        }

        function addUser() {
            vm.submitted = true;
            return adminUserService.addUser(vm.formAddUser).then(
                function(response) {
                    if(response.rc !== '00') {
                        SweetAlert.swal("Error!", "", "error");
                    } else {
                        SweetAlert.swal({
                            title: "Berhasil",
                            text: "User " +vm.formAddUser.username+ " berhasil ditambahkan",
                            type: "success",
                            closeOnConfirm: true },
                            function(isConfirm){if (isConfirm) { goBack(); }
                        });
                    }
                }, function() {
                    SweetAlert.swal("Error!", "Username telah terdaftar", "error");
                    vm.submitted = false;
                });
        }

        function changeRole(roleId) {
          vm.groups = [];
          vm.formAddUser.idMGroup = '';
          adminUserService.groupsRole(roleId).then(function (response) {
            vm.groups = response;
          });
        }

        function goBack() {
            $state.go('^');
        }

        function resetForm() {
          vm.groups = [];
          vm.formAddUser = {};
          vm.formUserAdd.$setUntouched();
        }

    }
})();
