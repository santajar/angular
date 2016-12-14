(function() {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .controller('AdminRoleAddController', AdminRoleAddController);

    /* @ngInject */
    function AdminRoleAddController(adminRoleService, SweetAlert, $scope, $state) {
        var vm = this;
        vm.addRole = addRole;
        vm.default = {};
        vm.goBack = goBack;
        vm.submitted = false;

        activate();

        ////////////////

        function activate() {

        }

        function addRole() {
            vm.submitted = true;
            return adminRoleService.addRole(vm.formAddRole).then(
                function() {
                    SweetAlert.swal({
                        title: "Berhasil",
                        text: "Role " +vm.formAddRole.roleName+ " berhasil ditambahkan",
                        type: "success",
                        closeOnConfirm: true },
                        function(isConfirm){if (isConfirm) { goBack(); }
                    });
                }, function() {
                    SweetAlert.swal("Server Error!", "Contact Your Administrator", "error");
                    vm.submitted = false;
                });
        }

        function goBack() {
            $state.go('^');
        }
    }
})();
