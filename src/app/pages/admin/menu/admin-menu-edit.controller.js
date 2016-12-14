(function() {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .controller('AdminMenuEditController', AdminMenuEditController);

    /* @ngInject */
    function AdminMenuEditController(menu, adminMenuService, SweetAlert, $state, $stateParams) {
        var vm = this;
        vm.formUpdateMenu = menu;
        vm.goBack = goBack;
        vm.updateMenu = updateMenu;

        activate();

        ////////////////

        function activate() {

        }

        function goBack() {
            $state.go('^');
        }

        function updateMenu() {
            SweetAlert.swal(
                {
                    title: "Are you sure?",
                    text: "Update this user data !?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, update it!",
                    cancelButtonText: "No, cancel it!",
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        return adminMenuService.updateMenu(vm.formUpdateMenu).then(
                            function(response) {
                                if (response.rc === '00') {
                                    SweetAlert.swal("Update!", "Menu Name " + vm.formUpdateMenu.menuName + " has been updated.", "success");
                                    goBack();
                                } else {
                                    SweetAlert.swal("Failed", "Query Error", "error");
                                }
                            }, function(response) {
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
