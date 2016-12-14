(function() {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .controller('AdminGroupAddController', AdminGroupAddController);

    /* @ngInject */
    function AdminGroupAddController(adminGroupService, roles, SweetAlert, $scope, $state) {
        var vm = this;
        vm.addGroup = addGroup;
        vm.default = {};
        vm.goBack = goBack;
        vm.roles = roles;
        vm.submitted = false;

        activate();

        ////////////////

        function activate() {

        }

        function addGroup() {
            vm.submitted = true;
            return adminGroupService.addGroup(vm.formAddGroup).then(
                function() {
                    SweetAlert.swal({
                        title: "Berhasil",
                        text: "Group " +vm.formAddGroup.groupName+ " berhasil ditambahkan",
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
