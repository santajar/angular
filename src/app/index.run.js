(function () {
  'use strict';

  angular
    .module('BlurAdmin');
    // .run(runBlock);

  /** @ngInject */
  // function runBlock(AuthService, toastr, SweetAlert, $rootScope, $state) {
  //   var stateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState) {
  //     if (toState.name !== 'login') {
  //       if (!AuthService.getAuth()) {
  //         event.preventDefault();
  //         $state.go('login');
  //         SweetAlert.swal("STOP!", "Harap lakukan Login terlebih dahulu!", "error");
  //       } else {
  //
  //       }
  //     } else {
  //       if (AuthService.getAuth()) {
  //         event.preventDefault();
  //         SweetAlert.swal("Denied", "You Already Loggedin", "error");
  //       }
  //     }
  //   });
  //
  //   var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
  //     if (fromState.name === 'login' && toState.name === 'dashboard') {
  //       toastr.info('Welcome');
  //     }
  //   });
  //
  // }
})();
