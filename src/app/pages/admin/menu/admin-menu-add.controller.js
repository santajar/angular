(function() {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .controller('AdminMenuAddController', AdminMenuAddController);

    /* @ngInject */
    function AdminMenuAddController(adminMenuService, SweetAlert, $scope, $state) {
        var vm = this;
        vm.addMenu = addMenu;
        vm.default = {};
        vm.goBack = goBack;
        vm.submitted = false;

        activate();

        ////////////////

        function activate() {

        }

        function addMenu() {
            vm.submitted = true;
            return adminMenuService.addMenu(vm.formAddMenu).then(
                function() {
                    SweetAlert.swal({
                        title: "Berhasil",
                        text: "Menu " +vm.formAddMenu.menuName+ " berhasil ditambahkan",
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
