(function () {
  'use strict';

  angular
    .module('BlurAdmin.pages')
    .controller('LoginController', LoginController);

  function LoginController(AuthService, SweetAlert, $state, MenuService) {
    var vm = this;
    vm.submitted = false;
    vm.login = login;

    activate();

    ////////////////

    function activate() {}

    function login() {
      vm.submitted = true;
      return AuthService.auth(vm.formLogin.username, vm.formLogin.password).then(
        function (response) {
          if (response) {
            return MenuService.getMenus(AuthService.getMenusCredentials()).then(function (response) {
              MenuService.setMenu(response.list);
              $state.go('dashboard');
            });
          } else {
            SweetAlert.swal("Login Failed!", "Username/Password Salah!!", "error");
            vm.submitted = false;
          }
        },
        function () {
          SweetAlert.swal("Server Error!", "Contact Your Administrator", "error");
          vm.submitted = false;
        });
    }

  }
})();
